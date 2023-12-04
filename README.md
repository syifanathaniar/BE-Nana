# simple app for my capstone project using express.js & prisma

# step by step 

1. inisiasi project npm dengan menggunakan command `npm init -y`
2. update `package json` dengan menambahkan di bagian script seperti :
```json
"scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
},
```
3. install package yang di perlukan
```bash 
npm install express dotenv cors mysql2
```

4. install devDevendency karena pake nodemon
```bash
npm install -D nodemon
npm run start:dev
```

5. lalu akan ada `node_modules` dan `package-lock.json` yang dibuat secara otomatis oleh `npm` dimana file tersebut jangan diubah isinya dan jangan lupa di pus di github.

6. biar `node_modules` dan `.env` tidak ke push digithub kita akan bikin 1 file namanya `.gitignore` biar `node_modules` dan `.env` tidak ikut up di git.

7. kalau males bisa dibuat di gitbash atau terminal pake command ini :
```bash
echo node_modules .env >> .gitignore
```

8. inisiasi project dengan membuat 1 file entrypoint disini gw pake `index.js`. kalau sudah membuat filenya bisa update `package.json` dimana script untuk memulai aplikasi backend harus ke entrypoint file yang kalian tentukan tadi. contoh discript jadinya 

```json
"scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
},
```

9. import express, dotenv, dan package lain yang awal kita install tadi, buatlah 1 rute untuk mencoba apakah aplikasi berjalan atau tdk

contohnya 
```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get("/", async(req, res) => {
    res.send("here is the response");
});

app.all("*", async(req, res) => {
    res.json({
        message: "Routes you're looking is not found",
    });
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is already running at ${PORT}`);
});
```

10. lnjt dlm inisiasi integrasi project ini dengan prisma agar kita bisa terhubung dengan database dan melakukan pengambilan/ masukin data ke database dengan [prisma](https://prisma.io);

11. insiasi project npm yang ingin di integrasikan engn prisma kita hrs install prismanya 

```bash
npm install -D prisma
npx prisma init
```

12. inisiasi jdi mysql 
```bash
npx prisma init --datasource-provider mysql
```

13. lalu akan tambah pada file `.env` dimana `DATABASE_url`dmn nnti diisi sesuai dengan database dri railway, kalau jalanin dri local jalanin dri local dulu aja. dan ada 1 file khsus yang ke generated dalam folder `prisma` namanya `prisma.schema`dmn kalian hrs mendefinisikan code database yg sudah di rencanakan

14. kita bisa buat `schema` database dri yang udah kita rencanain dalam file `schema.prisma` dimana ada sintaxnya sendiri dan kalian bisa baca docnya di prisma docs.
```
model Product {
  id        Int @id @default(autoincrement())
  name      String
  price     Int
  imageUrl  String? // kalau mau dibikin gpp kalau dtanya ksong
  catalogId Int?
  createdAt DateTime @default(now())
  // Untuk relasiin dri product ke katalog yang dimana product boleh ga punya catalog
  Catalog   Catalog? @relation(fields: [catalogId], references: [id])
}

model Catalog {
   id        Int @id @default(autoincrement())
  name       String
  // untuk nambahin relasi antara catalog dengan product
  products   Product[]// catalog punya banyak product
}

model Message {
  id        Int @id @default(autoincrement())
  name      String
  email     String
  message   String @db.Text // biar bisa nyimpen pesan dengan karakter yang panjang
  createdAt DateTime
}
```
15. singkronin dtabase yg udh di bikin dengan cara 

```bash
npx prisma migrate dev --name init
```
<nama_apa_yang_kalian_lalukan> bisa diganti dengan aktifitas apa yang kamu lakukan barusan contoh :
1. inisialisasi
2. add_new_model_User
3. add_relation_to_catalog_and product

`npx prisma migrate dev` wajib dilakukan setiap kali kalian sudah selesai mengubah `schema.prisma` atau adanya perubahan pada `schema.prisma` agar database selalu tersingkronisasi
