import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from underthesea import word_tokenize
from bson import ObjectId

stop_words_vietnamese = [
    'và', 'hay', 'là', 'của', 'từ', 'một', 'cái', 'người', 'cho', 'được', 'có', 'trong',
    'đã', 'cũng', 'để', 'không', 'với', 'là', 'làm', 'vào', 'như', 'ở', 'đến', 'này', 'nơi',
    'khi', 'nào', 'nếu', 'sau', 'mà', 'các', 'lên', 'bị', 'ra', 'nên', 'đang', 'hay', 'thì',
    'việc', 'lại', 'có', 'thể', 'cũng', 'nhiều', 'đây', 'về', 'trước', 'qua', 'rằng', 'đó',
    'tại', 'nếu', 'sự', 'là', 'nên', 'để', 'phải', 'chỉ', 'còn', 'hoặc', 'thậm', 'chí', 'đều',
    'vẫn', 'thế', 'nào', 'tất', 'cả', 'đều', 'mình', 'chưa', 'ai', 'nói', 'chúng', 'ta', 'tôi',
    'biết', 'điều', 'gì', 'làm', 'nên', 'đi', 'lại', 'một', 'cách', 'thường', 'nhưng', 'vẫn',
    'nên', 'làm', 'nên', 'làm', 'tại', 'sao', 'đâu', 'mình', 'tôi', 'tớ', 'cậu', 'mày', 'mầy',
    'tao', 'mày', 'nó', 'nó', 'cậu', 'ta', 'tui', 'tui', 'nó', 'chúng', 'nó', 'họ', 'họ', 'chúng',
    'bọn', 'họ', 'chúng', 'bọn', 'họ', 'chúng', 'tui', 'bọn', 'tui', 'bọn', 'họ', 'họ', 'mình', 'tui'
]

def recommendation(product_id, df):
    # Chuẩn hóa văn bản trong cột 'description'
    df['description'] = df['description'].str.lower()

    # Chuyển đổi biến phân loại 'sex' và 'category' thành dạng số
    le_sex = LabelEncoder()
    df['sex'] = le_sex.fit_transform(df['sex'])

    le_category = LabelEncoder()
    df['category'] = le_category.fit_transform(df['category'])

    # Tạo TF-IDF Vectorizer cho cột 'description'
    tfidf_vectorizer = TfidfVectorizer(stop_words=stop_words_vietnamese, tokenizer=word_tokenize)
    tfidf_matrix = tfidf_vectorizer.fit_transform(df['description'])

    # Chuẩn hóa độ dài của ratings
    scaler = MinMaxScaler()
    df['ratings_length'] = df['ratings'].apply(len)
    ratings_length_scaled = scaler.fit_transform(df[['ratings_length']])

    # Kết hợp các đặc trưng vào một ma trận
    combined_features = np.hstack((tfidf_matrix.toarray(), 
                                   df[['sex', 'category']].values, 
                                   ratings_length_scaled))

    # Tính toán sự tương đồng cosine dựa trên ma trận kết hợp
    cosine_sim = cosine_similarity(combined_features, combined_features)

    # Tìm index của sản phẩm
    product_index = df.index[df['_id'] == product_id].tolist()
    if not product_index:
        raise ValueError("Invalid product_id")
    
    # Retrieve the cosine similarities for the product_index
    sim_scores = list(enumerate(cosine_sim[product_index[0]]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Loại bỏ sản phẩm trùng với product_id
    sim_scores = [score for score in sim_scores if df.iloc[score[0]]['_id'] != product_id]

    # Lấy danh sách sản phẩm gợi ý
    sim_scores = sim_scores[:10]
    product_indices = [i[0] for i in sim_scores]
    
    return df.iloc[product_indices]['_id'].tolist()