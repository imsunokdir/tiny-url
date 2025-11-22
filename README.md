# TinyURL Clone

A **TinyURL-like URL shortening service** built with **React (Vite)** for the frontend and **Node.js + Express + Prisma** for the backend. Users can create short links, view click statistics, and manage their URLs.

---

## 🚀 Features

* Shorten long URLs into compact, shareable links
* View the total number of clicks for each link
* Copy short links with a single click
* Delete links
* Search links by short code or target URL
* Responsive design

---

## 🛠 Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Ant Design
* **Backend:** Node.js, Express, Prisma, PostgreSQL
* **Deployment:** Frontend on [Vercel](https://vercel.com), Backend on [Render](https://render.com)

---



---

## ⚡ Getting Started

### Backend (Server)

1. Clone the repo:

```bash
git clone https://github.com/imsunokdir/tiny-url.git
cd tiny-url/server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your database URL:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
PORT=8000
FRONTEND_URL=vercel
```

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Apply migrations / push schema:

```bash
npm run prisma:migrate
# or for development:
npm run prisma:push
```

6. Start the server:

```bash
npm run dev
```

---

### Frontend (React + Vite)

1. Navigate to the frontend folder:

```bash
cd ../client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and set your API URL:

```
VITE_API_URL=https://tinyurl-trc8.onrender.com/api
```

4. Start the frontend:

```bash
npm run dev
```

---

## 🌐 Deployment

* **Frontend:** Hosted on Vercel → [https://tiny-url-olive.vercel.app](https://tiny-url-olive.vercel.app)
* **Backend:** Hosted on Render → [https://tinyurl-trc8.onrender.com](https://tinyurl-trc8.onrender.com)

---

## 📌 API Endpoints

| Endpoint           | Method | Description                   |
| ------------------ | ------ | ----------------------------- |
| `/api/links`       | GET    | Get all links                 |
| `/api/links`       | POST   | Create a new short link       |
| `/api/links/:code` | DELETE | Delete a link by code         |
| `/api/links/:code` | GET    | Get details of a link by code |

---

## 📚 Screenshots

**Dashboard:**
![Dashboard](screenshots/dashboard.png)

**Create Short Link:**
![Create](screenshots/create-link.png)

---

## 💡 Notes

* Ensure CORS is correctly configured on the backend for the frontend domain.
* Skeleton loaders are used while fetching data for a smoother UX.

---

## 👤 Author

**Imsu Nokdir**
GitHub: [https://github.com/imsunokdir](https://github.com/imsunokdir)

---

## 📝 License

This project is licensed under the MIT License.
