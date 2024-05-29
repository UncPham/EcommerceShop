from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import pandas as pd
from recommendation import recommendation

app = FastAPI()

# Thêm middleware CORS để cho phép truy cập từ mọi nguồn
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Có thể điều chỉnh điều này để hạn chế hơn
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient('mongodb+srv://admin:admin@cluster0.7lohanj.mongodb.net/')

# Truy cập vào cơ sở dữ liệu
db = client['test']

# Truy cập vào collection
collection = db['products']

# Lấy các documents từ collection
documents = collection.find()

# Tạo một danh sách chứa dữ liệu từ MongoDB
data = []
for doc in documents:
    data.append({
        '_id': str(doc.get('_id')),
        'name': doc.get('name'),
        'ratings': doc.get('ratings'),
        'sex': doc.get('sex'),
        'category': doc.get('category'),
        'description': doc.get('description')
    })

# Tạo DataFrame từ danh sách dữ liệu
df = pd.DataFrame(data)

# Đóng kết nối
client.close()

# Kiểm tra xem máy chủ đã kết nối chưa
@app.get("/ping")
def pong():
    return {"ping": "pong!"}

# Lấy các gợi ý từ tên mặt hàng và tên người dùng
@app.get("/recommend")
async def get_recommendations(product_id):
    # Gọi hàm recommend để lấy các gợi ý dựa trên tên mặt hàng và tên người dùng
    recommendations = recommendation(product_id=product_id, df=df)
    return {"recommendations": recommendations}

