<script setup>
import { ref } from 'vue'
const dialogRef = ref()
</script>

# HTML

## Modal 弹窗

<div class='demo'>
    <button @click="dialogRef.showModal()">提示框</button>
    <dialog @click="dialogRef.close()" ref="dialogRef">我是提示内容</dialog>
</div>

```vue-html
<button @click="dialogRef.showModal()">提示框</button>
<dialog @click="dialogRef.close()" ref="dialogRef">我是提示内容</dialog>
```
