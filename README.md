# 📬 Tracking Pixel Backend

This is a NestJS-based backend service for generating and tracking email open events using a transparent tracking pixel. It allows you to:

- Generate a unique tracking hash for each email
- Serve a 1x1 pixel image that logs:
  - Open time
  - IP address and inferred location
  - Forwarded email details (if available)
- Retrieve tracking data and open logs
- Use via Docker Compose for easy deployment

---

## 🐳 Run via Docker Compose

```bash
docker-compose up --build
```
This will spin up:
-  The NestJS API server
- A PostgreSQL database instance

Make sure to copy and configure the .env file before starting.

---

## 🔧 Environment Variables
Create a .env file in the root directory with the following content:

```env
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=tracking_pixel_db
PIXEL_BASE_URL=https://yourdomain.com
```

---

## 📦 API Endpoints
All API endpoints are grouped under Swagger.
Access Swagger documentation at: `http://localhost:3001/`

#### ✉️ Tracking Endpoints
| Method | Endpoint | Description |
|--------|--------------------------|--------------------------------------------------| 
| POST | / tracking/generate | Generate a new tracking hash | 
| GET | /tracking/ list | List all generated tracking hashes | 
| GET | /tracking/:trackingHash| Get tracking + open log data for a hash |

#### 📸 Pixel Endpoint
| Method | Endpoint | Description |
|--------|----------------------------|-----------------------------------------------|
| GET | /pixel/:trackingHash | Serves a 1x1 pixel image and logs the open |

---

## 🧪 Example Embed Code
Once a hash is generated, copy the HTML embed code from the Swagger response:
```HTML
<img src="https://yourdomain.com/pixel/{trackingHash}" width="1" height="1" style="display:none;" />
```
Paste this into your email templates or webpages.

---

## 🗃️ Project Structure


```bash
src/
├── tracking/         # Tracking hash and campaign management
├── pixels/           # Pixel serving and open logging
├── common/           # Shared utils, DTOs, etc.
```

---

## 🧹 TODO / Improvements
 - GeoIP lookup for better location resolution
- Email-forward detection logic enhancements
- Admin dashboard or analytics frontend
- Auth for sensitive endpoints
