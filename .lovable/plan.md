
# Add UPPAbaby Cruz V2 Product Image

## Overview
Replace the placeholder Unsplash image for the UPPAbaby Cruz V2 stroller with the real product photo you've uploaded.

## Implementation Steps

### 1. Create Stroller Assets Directory
Create a new folder at `src/assets/strollers/` to organize all stroller product images.

### 2. Copy Uploaded Images
Copy both uploaded images to the project:
- `user-uploads://Bugaboo_Butterfly.png` → `src/assets/strollers/butterfly.png`
- `user-uploads://UPPAbaby_Cruz_V2.png` → `src/assets/strollers/cruz-v2.png`

### 3. Update Strollers Data File
Modify `src/data/strollers.ts` to:
- Add import statements for both images at the top of the file
- Replace the Unsplash URLs with the imported image references

```text
Before (line 35):
  image: "https://images.unsplash.com/photo-1623018035782-b269248df916?w=600&h=600&fit=crop"

After:
  image: butterflyImage

Before (line 51):
  image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=600&fit=crop"

After:
  image: cruzV2Image
```

## Technical Details

- Using ES module imports ensures proper bundling and optimization by Vite
- No changes needed to StrollerCard component - it already accepts image paths via the `src` attribute

## Remaining Images

After this update, 3 strollers will still need real product images:
- UPPAbaby Vista V2
- Babyzen YOYO²
- Bugaboo Donkey 5

Upload these when ready and I'll integrate them the same way.
