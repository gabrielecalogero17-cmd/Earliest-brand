import json
import urllib.request
import urllib.error
import re
import os

# Configuration
NOTION_TOKEN = "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"
PAGE_ID = "344b999b153b800fa4ccd3364ccf6cfe"
MARKDOWN_FILE = r"c:\Users\emokh\Desktop\Earliest brand\m4medical\script ped luglio m4medical\PIANO_EDITORIALE_PARODONTITE.md"

def parse_markdown(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return []

    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    blocks = []
    in_table = False
    table_rows = []
    
    i = 0
    while i < len(lines):
        line = lines[i].strip('\n')
        stripped = line.strip()

        # Handle Tables
        if stripped.startswith('|'):
            in_table = True
            cells = [c.strip() for c in line.split('|')]
            if len(cells) > 1:
                # Remove first and last empty elements if they exist due to outer pipes
                if cells[0] == '':
                    cells = cells[1:]
                if len(cells) > 0 and cells[-1] == '':
                    cells = cells[:-1]
                
                # Check if it is a separator line (like | :--- | :--- |)
                is_separator = all(re.match(r'^:?-+:?$', c) for c in cells)
                if not is_separator:
                    table_rows.append(cells)
            i += 1
            continue
        elif in_table:
            if table_rows:
                blocks.append(create_table_block(table_rows))
            table_rows = []
            in_table = False

        if not stripped:
            i += 1
            continue

        # Headers
        if stripped.startswith('# '):
            blocks.append(create_header_block(stripped[2:], 1))
        elif stripped.startswith('## '):
            blocks.append(create_header_block(stripped[3:], 2))
        elif stripped.startswith('### '):
            blocks.append(create_header_block(stripped[4:], 3))
        # Horizontal Rule
        elif stripped == '---':
            blocks.append({"object": "block", "type": "divider", "divider": {}})
        # Bulleted List Items
        elif stripped.startswith('* ') or stripped.startswith('- '):
            content = stripped[2:]
            blocks.append(create_bullet_block(content))
        # Standard Paragraph
        else:
            blocks.append(create_paragraph_block(stripped))
        
        i += 1

    if in_table and table_rows:
        blocks.append(create_table_block(table_rows))

    return blocks

def create_header_block(text, level):
    type_str = f"heading_{level}"
    return {
        "object": "block",
        "type": type_str,
        type_str: {
            "rich_text": parse_rich_text(text)
        }
    }

def create_paragraph_block(text):
    return {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
            "rich_text": parse_rich_text(text)
        }
    }

def create_bullet_block(text):
    return {
        "object": "block",
        "type": "bulleted_list_item",
        "bulleted_list_item": {
            "rich_text": parse_rich_text(text)
        }
    }

def create_table_block(rows):
    width = len(rows[0])
    table_children = []
    
    for row in rows:
        cells = []
        for cell in row:
            cells.append(parse_rich_text(cell))
        
        while len(cells) < width:
            cells.append([])
        cells = cells[:width]
        
        table_children.append({
            "type": "table_row",
            "table_row": {
                "cells": cells
            }
        })
        
    return {
        "object": "block",
        "type": "table",
        "table": {
            "table_width": width,
            "has_column_header": True,
            "has_row_header": False,
            "children": table_children
        }
    }

def parse_rich_text(text):
    # Basic markdown bold parser (**text**)
    parts = re.split(r'(\*\*.*?\*\*)', text)
    rich_text = []
    
    for part in parts:
        if part.startswith('**') and part.endswith('**'):
            content = part[2:-2]
            rich_text.append({
                "type": "text",
                "text": {"content": content},
                "annotations": {"bold": True}
            })
        else:
            # Inline code (`code`)
            code_parts = re.split(r'(\`.*?\`)', part)
            for cp in code_parts:
                if cp.startswith('`') and cp.endswith('`'):
                    rich_text.append({
                        "type": "text",
                        "text": {"content": cp[1:-1]},
                        "annotations": {"code": True}
                    })
                elif cp:
                    rich_text.append({
                        "type": "text",
                        "text": {"content": cp}
                    })
    return rich_text

def delete_all_blocks():
    url = f"https://api.notion.com/v1/blocks/{PAGE_ID}/children?page_size=100"
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": "2022-06-28"
    }
    
    has_more = True
    next_cursor = None
    all_block_ids = []
    
    print("Fetching existing blocks on Notion page to delete...")
    while has_more:
        fetch_url = url
        if next_cursor:
            fetch_url += f"&start_cursor={next_cursor}"
            
        req = urllib.request.Request(fetch_url, headers=headers, method="GET")
        try:
            with urllib.request.urlopen(req) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                for block in res_data.get("results", []):
                    all_block_ids.append(block.get("id"))
                has_more = res_data.get("has_more", False)
                next_cursor = res_data.get("next_cursor", None)
        except Exception as e:
            print("Error fetching blocks:", e)
            return False
            
    print(f"Found {len(all_block_ids)} blocks to delete.")
    
    for idx, block_id in enumerate(all_block_ids):
        print(f"Deleting block {idx+1}/{len(all_block_ids)}: {block_id}")
        delete_url = f"https://api.notion.com/v1/blocks/{block_id}"
        req_del = urllib.request.Request(delete_url, headers=headers, method="DELETE")
        try:
            with urllib.request.urlopen(req_del) as response:
                pass
        except Exception as e:
            print(f"Error deleting block {block_id}: {e}")
            
    print("All existing blocks deleted successfully!")
    return True

def upload_blocks(blocks):
    chunk_size = 50
    chunks = [blocks[i:i + chunk_size] for i in range(0, len(blocks), chunk_size)]
    
    url = f"https://api.notion.com/v1/blocks/{PAGE_ID}/children"
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
    }

    for idx, chunk in enumerate(chunks):
        print(f"Uploading chunk {idx + 1}/{len(chunks)} ({len(chunk)} blocks)...")
        data = json.dumps({"children": chunk}).encode("utf-8")
        
        req = urllib.request.Request(url, data=data, headers=headers, method="PATCH")
        try:
            with urllib.request.urlopen(req) as response:
                res_body = response.read().decode("utf-8")
                print(f"Successfully uploaded chunk {idx + 1}")
        except urllib.error.HTTPError as e:
            print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
            return False
        except Exception as e:
            print(f"Error: {e}")
            return False
            
    return True

if __name__ == "__main__":
    print("\nParsing new PED markdown...")
    blocks = parse_markdown(MARKDOWN_FILE)
    print(f"Parsed {len(blocks)} blocks from markdown.")
    
    if blocks:
        print("Uploading to Notion...")
        success = upload_blocks(blocks)
        if success:
            print("\nSync completed successfully! Go check your Notion page.")
        else:
            print("\nSync failed. See errors above.")
    else:
        print("No blocks to upload.")
