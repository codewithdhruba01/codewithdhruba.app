# 🔧 Giscus Installation Fix

## Error: "giscus is not installed on this repository"

आपको Giscus app को properly install करना होगा।

## 📋 Step-by-Step Fix

### Step 1: Giscus App Install करें

1. **GitHub पर जाएं**: [github.com/apps/giscus](https://github.com/apps/giscus)
2. **"Install" button पर click करें**
3. **Account select करें**: अपना GitHub account
4. **Repository access choose करें**:
   - **Option A (Recommended)**: "All repositories" - सभी repositories पर access
   - **Option B**: "Only select repositories" - फिर अपना repository select करें

### Step 2: Repository Permissions Check करें

1. अपने repository पर जाएं
2. **Settings** tab पर click करें
3. **Integrations** → **Applications** पर जाएं
4. **Giscus** app listed होना चाहिए

अगर नहीं है तो:
- Giscus app को reinstall करें
- Repository access permissions check करें

### Step 3: Discussions Enable करें

1. Repository **Settings** → **Features**
2. **Discussions** checkbox को ✅ enable करें
3. **Save changes** पर click करें

### Step 4: Category Create करें

1. Repository के **Discussions** tab पर जाएं
2. **New category** button पर click करें
3. **Category name**: `Blog Comments`
4. **Description**: `Comments for blog posts`
5. **Create** पर click करें

### Step 5: Configuration Verify करें

1. [giscus.app](https://giscus.app) पर जाएं
2. **Repository**: `dhrubarajpati/codewithdhruba.app`
3. **Page ↔ Discussions mapping**: `Discussion title contains page pathname`
4. **Discussion category**: `Blog Comments`
5. **Generate** करें

**आपके पास ये values होनी चाहिए:**
- Repository ID: `R_kgDOO78xow`
- Category ID: `DIC_kwDOO78xo84C0Eyx`

## 🔍 Troubleshooting

### Error: "Repository not found"
```
Solution: Repository name को double-check करें
Format: username/repository-name
```

### Error: "Category not found"
```
Solution: "Blog Comments" category create करें
```

### Error: "Discussion not found"
```
Solution: पहला comment manually create करें GitHub पर
या mapping को "Discussion title contains page URL" पर change करें
```

## 🧪 Test Steps

### Step 1: GitHub पर Test करें
1. अपने repository पर जाएं
2. **Discussions** tab पर click करें
3. **New discussion** create करें
4. **Category**: Blog Comments
5. **Title**: test-blog-post
6. **Body**: Test comment
7. **Create** करें

### Step 2: Website पर Test करें
1. Blog post खोलें: `http://localhost:5173/`
2. Comments section तक scroll करें
3. अब comments load होना चाहिए

## ⚙️ Alternative Configuration (अगर ऊपर नहीं काम करता)

### Option 1: Different Mapping
```javascript
mapping="url"  // या "title" try करें
```

### Option 2: Manual Discussion Creation
GitHub पर manually discussions create करें matching your blog post URLs.

### Option 3: Category ID Check
अपनी category ID को verify करने के लिए:
1. Repository पर जाएं
2. Developer tools (F12) खोलें
3. Network tab पर जाएं
4. Discussions page load करें
5. API calls में category ID ढूंढें

## 📞 Support

अगर problem persists:
1. अपना repository URL share करें
2. Giscus configuration screenshot भेजें
3. Browser console errors बताएं

**Giscus app install करने के बाद सब work करना चाहिए!** 🚀
