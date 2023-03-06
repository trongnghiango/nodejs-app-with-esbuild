###

#### import {} from './path/module/index.js' by './path/module'

-> run command below:

```json
{
  "dev": "node --es-module-specifier-resolution=node ./path/main.js"
}
```

#### using dotenv

- để sử dụng được các biến môi trường khi khai báo ở file: .env or config.env or ...

```js
// khai báo mặc định
import dotenv from "dotenv";
dotenv.config(); //tự động trỏ tới file

// Khai báo chỉ rõ đường dẫn
dotenv.config({ path: "./path/config.env" });
```

#### ERROR Handler;

- Đặt middleware Error handler nằm bên dưới phần khai báo router;
  -> Vì sao thế?

```js
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 500;
  next(error);
});

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    msg: err.message,
  });
});
```

- Test
