# API Test Guide

## المشكلة الحالية:
الـ endpoint `/admin/specialties` يرجع **400 Bad Request**

## للتأكد من المشكلة:

### 1. اختبر الـ API مباشرة باستخدام Postman أو curl:

```bash
# Get all specialties
curl -X GET http://localhost:3000/Freelancing/api/v1/admin/specialties \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 2. الأسباب المحتملة للـ 400 Error:

#### ❌ الاسم غلط:
- ممكن يكون `/admin/specialty` (بدون s)
- ممكن يكون `/admin/Specialties` (بحرف كبير)

#### ❌ الـ endpoint مش موجود:
- تأكد من الـ Backend routes
- شوف الـ Backend logs

#### ❌ الـ Backend بيحتاج parameters:
- ممكن يحتاج query parameters
- ممكن يحتاج request body

### 3. الحل المؤقت:
استخدم `/admin/skills` أو collection تاني بديل إذا كان موجود

### 4. تحقق من الـ Backend:
افحص ملف الـ routes في الـ Backend:
```javascript
// مثال:
router.get('/admin/specialties', ...);  // ✅
router.get('/admin/specialty', ...);   // ❓ ممكن يكون هنا المشكلة
```

### 5. اختبر Collections التانية:
جرب طلب أي collection من القائمة:
```javascript
// الـ Collections المتاحة:
['contracts', 'countries', 'users', 'proposals', 
 'skills', 'specialties', 'categories', 'jobs']
```

---

## الحل النهائي:

1. **إذا كان الاسم مختلف**: غيّر `specialties` إلى الاسم الصحيح
2. **إذا كان الـ endpoint مش موجود**: احذف الـ request أو استخدم بديل
3. **إذا كان يحتاج parameters**: أضف الـ parameters المطلوبة

