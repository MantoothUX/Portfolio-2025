# Style Inconsistencies Report

## 🔍 Found Inconsistencies

### 1. **Modal Title Font Family** ⚠️ HIGH PRIORITY
**Location:** `ProjectModal` component, line 430

**Issue:** The modal title uses system font (`font-semibold`) instead of Instrument Serif like all other major headings.

**Current:**
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
```

**Should be:**
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
```

**Impact:** Modal titles don't match the visual hierarchy of hero titles and section headings.

---

### 2. **Link Color Inconsistency** ⚠️ MEDIUM PRIORITY
**Location:** Multiple locations

**Issue:** Different green shades used for links across the site:

- **Modal header (company/role):** `text-green-600 dark:text-green-400` (line 408)
- **Tools used links:** `text-[#13531C] dark:text-green-400` (line 573)
- **About page resume link:** `text-[#13531C] dark:text-green-400` (line 717)

**Recommendation:** Standardize to one color:
- Use `text-[#13531C] dark:text-green-400` for all links (matches brand color)
- OR use `text-green-600 dark:text-green-400` consistently

**Impact:** Visual inconsistency in link colors reduces brand cohesion.

---

### 3. **Border Radius Inline Styles** ⚠️ LOW PRIORITY
**Location:** Multiple components

**Issue:** Some elements use inline `borderRadius` styles instead of Tailwind classes:

- **Project cards:** `borderRadius: '12px'` (line 201) - Could use `rounded-xl` (12px)
- **Project card image:** `borderRadius: '12px 12px 0 0'` (line 204) - Could use `rounded-t-xl`
- **About page photo:** `borderRadius: '20px'` (line 696) - Could use custom class or Tailwind
- **Outcome cards:** `borderRadius: '20px'` (lines 618, 626) - Could use custom class

**Recommendation:** 
- Use Tailwind classes where possible: `rounded-xl` (12px), `rounded-2xl` (16px)
- For 20px radius, either add to Tailwind config or create a utility class

**Impact:** Makes styling harder to maintain and less consistent with Tailwind patterns.

---

### 4. **Button Font Weight** ✅ MINOR
**Location:** About page contact buttons (lines 780, 784, 788)

**Issue:** Primary button (Email) doesn't explicitly have `font-semibold` class, though it may inherit it.

**Current:**
```tsx
<a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 px-6 py-3 bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 rounded-full hover:bg-green-800 dark:hover:bg-green-600 transition-colors">
```

**Should be:**
```tsx
<a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 px-6 py-3 bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 rounded-full hover:bg-green-800 dark:hover:bg-green-600 transition-colors font-semibold">
```

**Impact:** Very minor - buttons may appear slightly different in weight.

---

### 5. **Section Heading Consistency** ✅ GOOD
**Status:** Consistent ✅

All section headings (Overview, Challenges, Solution, etc.) use:
- `text-2xl`
- `fontFamily: "'Instrument Serif', serif"`
- `fontWeight: 400`
- `text-gray-900 dark:text-white`

---

### 6. **Button Styles** ✅ MOSTLY CONSISTENT
**Status:** Mostly consistent ✅

- Primary buttons: `bg-[#13531C] dark:bg-green-700`, `rounded-full`, `px-6 py-3` ✅
- Secondary buttons: `border`, `rounded-full`, `px-6 py-3` ✅
- Only minor issue: Email button missing explicit `font-semibold` (see #4)

---

## 📋 Summary

### Critical Issues (Should Fix):
1. **Modal title font** - Doesn't match other headings
2. **Link colors** - Three different green shades used

### Minor Issues (Nice to Fix):
3. **Border radius inline styles** - Should use Tailwind classes
4. **Button font weight** - Missing explicit `font-semibold` on Email button

### What's Working Well:
- Section headings are consistent
- Button styles are mostly consistent
- Color palette is generally consistent
- Spacing is consistent

---

## 🔧 Recommended Fixes Priority

1. **HIGH:** Fix modal title font to use Instrument Serif
2. **MEDIUM:** Standardize link colors across all components
3. **LOW:** Replace inline borderRadius with Tailwind classes
4. **LOW:** Add explicit font-semibold to Email button
