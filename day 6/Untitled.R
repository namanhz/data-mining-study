# ==============================================================================
# BÀI TẬP THỰC HÀNH - MACHINE LEARNING CƠ BẢN TRONG R
# Gồm 3 phần:
#   Bài 1: KNN phân loại trên dữ liệu GermanCredit
#   Bài 2: KNN hồi quy trên dữ liệu Boston
#   Bài 3: Cây quyết định (Decision Tree) trên dữ liệu iris
# ==============================================================================

# --- CÀI ĐẶT CÁC PACKAGE CẦN THIẾT (chỉ cần chạy 1 lần) ---
# Nếu chưa cài, bỏ comment các dòng dưới rồi chạy:
# install.packages("caret")
# install.packages("class")
# install.packages("MASS")
# install.packages("rpart")
# install.packages("rpart.plot")
# install.packages("e1071")  # cần cho confusionMatrix trong caret

# --- NẠP THƯ VIỆN ---
library(caret)       # Chứa dữ liệu GermanCredit + hàm train/confusionMatrix
library(class)       # Chứa hàm knn() để phân loại KNN
library(MASS)        # Chứa dữ liệu Boston
library(rpart)       # Chứa hàm rpart() để xây cây quyết định
library(rpart.plot)  # Vẽ cây quyết định đẹp hơn

# Đặt seed để kết quả tái lập được (reproducible)
set.seed(42)

# ══════════════════════════════════════════════════════════════════════════════
# PHẦN 1: BÀI TẬP THỰC HÀNH – BÀI 1 (KNN trên GermanCredit)
# ══════════════════════════════════════════════════════════════════════════════

cat("\n========== BÀI 1: KNN - GERMAN CREDIT ==========\n\n")

# ------------------------------------------------------------------------------
# Bước 1: Đọc dữ liệu GermanCredit từ package caret
# ------------------------------------------------------------------------------
# Dữ liệu GermanCredit nằm sẵn trong package caret.
# Gọi data() để nạp nó vào môi trường làm việc.
data(GermanCredit)

# Xem nhanh kích thước bộ dữ liệu gốc
cat("Kích thước dữ liệu GermanCredit gốc:", 
    nrow(GermanCredit), "dòng x", ncol(GermanCredit), "cột\n\n")

# ------------------------------------------------------------------------------
# Bước 2: Chọn 300 quan sát đầu tiên và 10 biến đầu tiên
# ------------------------------------------------------------------------------
# Lý do: Giảm kích thước dữ liệu để dễ thực hành, tránh tốn tài nguyên.
# GermanCredit[1:300, ] -> lấy 300 dòng đầu
# GermanCredit[, 1:10]  -> lấy 10 cột đầu
credit <- GermanCredit[1:300, 1:10]

cat("Kích thước dataframe credit:", 
    nrow(credit), "dòng x", ncol(credit), "cột\n\n")

# ------------------------------------------------------------------------------
# Bước 3: Xác định cấu trúc dữ liệu credit
# ------------------------------------------------------------------------------
# str() cho biết: số quan sát, số biến, kiểu dữ liệu từng biến,
# và một vài giá trị mẫu.
cat("--- Cấu trúc dữ liệu credit ---\n")
str(credit)

# summary() cho thống kê mô tả cơ bản: min, max, mean, median, quartiles
cat("\n--- Thống kê mô tả ---\n")
summary(credit)

# Xem 6 dòng đầu tiên để kiểm tra trực quan
cat("\n--- 6 dòng đầu tiên ---\n")
head(credit)

# ------------------------------------------------------------------------------
# Bước 4: Tiền xử lý dữ liệu
# ------------------------------------------------------------------------------

# --- 4a. Kiểm tra dữ liệu bị thiếu (NA) ---
# is.na() trả về ma trận TRUE/FALSE, sum() đếm tổng số TRUE (= số NA)
so_na <- sum(is.na(credit))
cat("\n--- 4a. Kiểm tra NA ---\n")
cat("Tổng số giá trị NA trong credit:", so_na, "\n")

# Nếu có NA, xem chi tiết từng cột có bao nhiêu NA
if (so_na > 0) {
  cat("Số NA theo từng cột:\n")
  print(colSums(is.na(credit)))
} else {
  cat("=> Dữ liệu KHÔNG có giá trị thiếu (NA). Tốt!\n")
}

# --- 4b. Kiểm tra giá trị đột xuất (outlier) ---
# Outlier = giá trị nằm ngoài khoảng [Q1 - 1.5*IQR, Q3 + 1.5*IQR]
# Nguyên lý: IQR (Interquartile Range) = Q3 - Q1 đo độ phân tán trung tâm.
# Giá trị quá xa trung tâm này bị coi là bất thường.
# Chỉ kiểm tra các biến số (numeric), không kiểm tra biến factor/character.

cat("\n--- 4b. Kiểm tra giá trị đột xuất (outlier) ---\n")

# Lọc ra các cột numeric trong credit
cot_so <- names(credit)[sapply(credit, is.numeric)]
cat("Các biến numeric:", paste(cot_so, collapse = ", "), "\n\n")

# Duyệt từng cột numeric, đếm số outlier theo quy tắc IQR
for (ten_cot in cot_so) {
  x <- credit[[ten_cot]]
  Q1 <- quantile(x, 0.25, na.rm = TRUE)
  Q3 <- quantile(x, 0.75, na.rm = TRUE)
  IQR_val <- Q3 - Q1
  
  # Biên dưới và biên trên
  bien_duoi <- Q1 - 1.5 * IQR_val
  bien_tren <- Q3 + 1.5 * IQR_val
  
  # Đếm số outlier: giá trị < biên dưới HOẶC > biên trên
  so_outlier <- sum(x < bien_duoi | x > bien_tren)
  
  if (so_outlier > 0) {
    cat(sprintf("  Biến '%s': %d outlier (ngoài [%.2f, %.2f])\n",
                ten_cot, so_outlier, bien_duoi, bien_tren))
  }
}

# Vẽ boxplot để trực quan hóa outlier (nếu muốn xem)
# boxplot(credit[, cot_so], main = "Boxplot các biến numeric", las = 2)

# --- 4c. Chuẩn hóa dữ liệu theo phương pháp Z-score ---
# Z-score: z = (x - mean) / sd
# Nguyên lý: KNN dựa trên khoảng cách Euclid giữa các điểm dữ liệu.
# Nếu biến A có đơn vị hàng nghìn, biến B có đơn vị 0-1, thì biến A sẽ
# "áp đảo" trong tính khoảng cách => chuẩn hóa để mọi biến đều có
# mean = 0, sd = 1 => đóng góp công bằng vào khoảng cách.
# Hàm scale() trong R thực hiện chính xác phép biến đổi z-score.

cat("\n--- 4c. Chuẩn hóa Z-score ---\n")

# Tách biến phân loại Class ra trước khi chuẩn hóa
# (Vì Class là biến target dạng factor, không chuẩn hóa được)
# Kiểm tra xem Class có nằm trong 10 cột đầu không
if ("Class" %in% names(credit)) {
  cat("Biến 'Class' có trong dữ liệu => tách ra trước khi chuẩn hóa.\n")
  
  # Lưu biến Class riêng
  credit_class <- credit$Class
  
  # Chỉ chuẩn hóa các cột numeric (loại bỏ Class)
  chi_so_numeric <- sapply(credit, is.numeric)
  credit_scaled <- as.data.frame(scale(credit[, chi_so_numeric]))
  
  # Gắn lại biến Class vào cuối
  credit_scaled$Class <- credit_class
  
} else {
  # Trường hợp Class không có trong 10 cột đầu
  # => chuẩn hóa tất cả cột numeric
  chi_so_numeric <- sapply(credit, is.numeric)
  credit_scaled <- as.data.frame(scale(credit[, chi_so_numeric]))
  
  # Lấy Class từ dữ liệu gốc (300 dòng đầu)
  credit_class <- GermanCredit$Class[1:300]
  credit_scaled$Class <- credit_class
  cat("Biến 'Class' KHÔNG nằm trong 10 cột đầu => lấy từ dữ liệu gốc.\n")
}

cat("Kiểm tra sau chuẩn hóa - mean và sd của cột đầu tiên:\n")
cat("  Mean:", round(mean(credit_scaled[[1]]), 6), "\n")
cat("  SD  :", round(sd(credit_scaled[[1]]), 6), "\n")
cat("  => mean ≈ 0, sd ≈ 1 là đúng.\n")

# Xem 6 dòng đầu của dữ liệu đã chuẩn hóa
cat("\n6 dòng đầu sau chuẩn hóa:\n")
head(credit_scaled)

# ------------------------------------------------------------------------------
# Bước 5: Chia dữ liệu thành tập huấn luyện (80%) và tập kiểm tra (20%)
# ------------------------------------------------------------------------------
# Nguyên lý: Không bao giờ đánh giá mô hình trên chính dữ liệu dùng để huấn
# luyện nó (overfitting). Tập kiểm tra đóng vai trò "bài thi" mà mô hình
# chưa từng thấy => đánh giá khả năng tổng quát hóa (generalization).
# createDataPartition() chia dữ liệu theo stratified sampling: đảm bảo tỷ lệ
# lớp Good/Bad trong tập train và test giống nhau (quan trọng khi dữ liệu
# mất cân bằng).

cat("\n--- Bước 5: Chia dữ liệu 80/20 ---\n")

# createDataPartition trả về chỉ số (index) của các dòng thuộc tập train
chi_so_train <- createDataPartition(credit_scaled$Class, p = 0.8, list = FALSE)

# Tách features (X) và label (Y)
# Loại bỏ cột Class ra khỏi features
cot_class <- which(names(credit_scaled) == "Class")

train_X <- credit_scaled[chi_so_train, -cot_class]   # Features tập train
test_X  <- credit_scaled[-chi_so_train, -cot_class]   # Features tập test
train_Y <- credit_scaled[chi_so_train, "Class"]        # Label tập train
test_Y  <- credit_scaled[-chi_so_train, "Class"]        # Label tập test

cat("Số quan sát tập train:", nrow(train_X), "\n")
cat("Số quan sát tập test :", nrow(test_X), "\n")
cat("Phân bố Class trong train:\n")
print(table(train_Y))
cat("Phân bố Class trong test:\n")
print(table(test_Y))

# ------------------------------------------------------------------------------
# Bước 6: Phân loại KNN - Chọn k tốt nhất trong 10 giá trị nhỏ nhất
# ------------------------------------------------------------------------------
# Nguyên lý thuật toán KNN:
#   - Với mỗi điểm cần dự đoán, tìm k điểm "hàng xóm" gần nhất trong tập
#     train (theo khoảng cách Euclid).
#   - Lớp của điểm mới = lớp chiếm đa số trong k hàng xóm đó (majority vote).
#   - k nhỏ => mô hình nhạy với nhiễu (overfitting).
#   - k lớn => mô hình quá đơn giản, bỏ qua pattern (underfitting).
#   => Cần thử nhiều giá trị k, chọn k cho accuracy cao nhất.

cat("\n--- Bước 6: Tìm k tốt nhất cho KNN ---\n")

# Thử k từ 1 đến 10
cac_gia_tri_k <- 1:10
ket_qua_k <- data.frame(k = integer(), accuracy = numeric())

for (k_val in cac_gia_tri_k) {
  # knn() từ package class: phân loại trực tiếp
  du_doan_tmp <- knn(train = train_X, test = test_X, cl = train_Y, k = k_val)
  
  # Tính accuracy = số dự đoán đúng / tổng số
  do_chinh_xac <- sum(du_doan_tmp == test_Y) / length(test_Y)
  
  ket_qua_k <- rbind(ket_qua_k, data.frame(k = k_val, accuracy = do_chinh_xac))
}

# In bảng kết quả
cat("\nBảng accuracy theo từng giá trị k:\n")
print(ket_qua_k)

# Tìm k tốt nhất (accuracy cao nhất)
k_tot_nhat <- ket_qua_k$k[which.max(ket_qua_k$accuracy)]
acc_tot_nhat <- max(ket_qua_k$accuracy)

cat(sprintf("\n=> k tốt nhất: %d (accuracy = %.4f = %.2f%%)\n",
            k_tot_nhat, acc_tot_nhat, acc_tot_nhat * 100))

# ------------------------------------------------------------------------------
# Bước 7: Dự đoán với k tốt nhất
# ------------------------------------------------------------------------------
cat("\n--- Bước 7: Dự đoán với k tốt nhất ---\n")

du_doan_knn <- knn(train = train_X, test = test_X, cl = train_Y, k = k_tot_nhat)

# Xem một vài kết quả dự đoán so với thực tế
cat("\n10 quan sát đầu tiên - So sánh dự đoán vs thực tế:\n")
so_sanh <- data.frame(
  Thuc_te  = test_Y[1:10],
  Du_doan  = du_doan_knn[1:10],
  Dung_sai = ifelse(test_Y[1:10] == du_doan_knn[1:10], "ĐÚNG", "SAI")
)
print(so_sanh)

# ------------------------------------------------------------------------------
# Bước 8: Đánh giá độ chính xác - Confusion Matrix
# ------------------------------------------------------------------------------
# Confusion Matrix cho biết chi tiết:
#   - True Positive (TP): dự đoán đúng lớp dương
#   - True Negative (TN): dự đoán đúng lớp âm
#   - False Positive (FP): dự đoán sai thành dương (lỗi loại I)
#   - False Negative (FN): dự đoán sai thành âm (lỗi loại II)
# Accuracy = (TP + TN) / (TP + TN + FP + FN)
# Sensitivity (Recall) = TP / (TP + FN) -> khả năng phát hiện đúng lớp dương
# Specificity = TN / (TN + FP) -> khả năng phát hiện đúng lớp âm

cat("\n--- Bước 8: Đánh giá mô hình KNN ---\n")

# confusionMatrix() từ package caret: tính toàn bộ metrics
bang_nham_lan <- confusionMatrix(du_doan_knn, as.factor(test_Y))
print(bang_nham_lan)

cat(sprintf("\n=> ACCURACY TỔNG THỂ: %.4f (%.2f%%)\n",
            bang_nham_lan$overall["Accuracy"],
            bang_nham_lan$overall["Accuracy"] * 100))


# ══════════════════════════════════════════════════════════════════════════════
# PHẦN 2: BÀI TẬP THỰC HÀNH – BÀI 2 (KNN hồi quy trên Boston)
# ══════════════════════════════════════════════════════════════════════════════

cat("\n\n========== BÀI 2: KNN HỒI QUY - BOSTON ==========\n\n")

# ------------------------------------------------------------------------------
# Bước 1: Đọc dữ liệu Boston và xác định cấu trúc
# ------------------------------------------------------------------------------
# Dữ liệu Boston: 506 quan sát, 14 biến, mô tả giá nhà ở Boston.
# Biến target: medv (median value of owner-occupied homes in $1000s)
# Đây là bài toán HỒI QUY (regression) vì medv là biến liên tục,
# khác với bài 1 là bài toán PHÂN LOẠI (classification).

data(Boston)

cat("--- Cấu trúc dữ liệu Boston ---\n")
str(Boston)
cat("\n--- Thống kê mô tả ---\n")
summary(Boston)

# ------------------------------------------------------------------------------
# Bước 2: Tiền xử lý - Chuẩn hóa z-score
# ------------------------------------------------------------------------------
# Chuẩn hóa features (tất cả trừ medv) để KNN hoạt động tốt.

cat("\n--- Tiền xử lý ---\n")
cat("Số NA:", sum(is.na(Boston)), "\n")

# Tách medv ra, chuẩn hóa phần còn lại
boston_features <- Boston[, -which(names(Boston) == "medv")]
boston_scaled <- as.data.frame(scale(boston_features))
boston_scaled$medv <- Boston$medv  # Gắn lại target (KHÔNG chuẩn hóa target)

# ------------------------------------------------------------------------------
# Bước 3: Chia dữ liệu 80/20
# ------------------------------------------------------------------------------
set.seed(42)
chi_so_train_b <- sample(1:nrow(boston_scaled), size = 0.8 * nrow(boston_scaled))

cot_medv <- which(names(boston_scaled) == "medv")

train_X_b <- boston_scaled[chi_so_train_b, -cot_medv]
test_X_b  <- boston_scaled[-chi_so_train_b, -cot_medv]
train_Y_b <- boston_scaled[chi_so_train_b, "medv"]
test_Y_b  <- boston_scaled[-chi_so_train_b, "medv"]

cat("Tập train:", length(train_Y_b), "quan sát\n")
cat("Tập test :", length(test_Y_b), "quan sát\n")

# ------------------------------------------------------------------------------
# Bước 4: Tìm k phù hợp cho KNN hồi quy
# ------------------------------------------------------------------------------
# Với bài toán hồi quy, KNN dự đoán = TRUNG BÌNH giá trị medv của k hàng xóm
# (thay vì majority vote như phân loại).
# Đánh giá bằng:
#   - RMSE (Root Mean Squared Error): sai số trung bình, càng nhỏ càng tốt
#   - R² (R-squared): tỷ lệ phương sai được giải thích, càng gần 1 càng tốt
# Dùng hàm train() của caret với method = "knn" để tự động tìm k tốt nhất.

cat("\n--- Tìm k tốt nhất cho KNN hồi quy ---\n")

# Tạo lại dataframe đầy đủ cho train() sử dụng
train_data_b <- boston_scaled[chi_so_train_b, ]
test_data_b  <- boston_scaled[-chi_so_train_b, ]

# trainControl: thiết lập cross-validation 10-fold
# Cross-validation: chia tập train thành 10 phần, huấn luyện trên 9 phần,
# kiểm tra trên 1 phần, lặp lại 10 lần => ước lượng sai số tin cậy hơn.
ctrl <- trainControl(method = "cv", number = 10)

# Thử k từ 1 đến 20
mo_hinh_knn_reg <- train(
  medv ~ .,                    # medv là target, dấu chấm = tất cả biến còn lại
  data = train_data_b,
  method = "knn",              # Thuật toán KNN
  trControl = ctrl,
  tuneGrid = data.frame(k = 1:20)  # Thử 20 giá trị k
)

# In kết quả
cat("\nKết quả cross-validation:\n")
print(mo_hinh_knn_reg)

cat(sprintf("\n=> k tốt nhất: %d\n", mo_hinh_knn_reg$bestTune$k))

# ------------------------------------------------------------------------------
# Bước 5: Dự đoán và đánh giá
# ------------------------------------------------------------------------------
cat("\n--- Dự đoán và đánh giá ---\n")

du_doan_boston <- predict(mo_hinh_knn_reg, newdata = test_data_b)

# Tính RMSE thủ công
rmse_val <- sqrt(mean((du_doan_boston - test_Y_b)^2))

# Tính R²: R² = 1 - SS_res / SS_tot
ss_res <- sum((test_Y_b - du_doan_boston)^2)
ss_tot <- sum((test_Y_b - mean(test_Y_b))^2)
r2_val <- 1 - ss_res / ss_tot

# Tính MAE (Mean Absolute Error)
mae_val <- mean(abs(du_doan_boston - test_Y_b))

cat(sprintf("RMSE : %.4f (sai số trung bình ~%.0f nghìn USD)\n", rmse_val, rmse_val * 1000))
cat(sprintf("MAE  : %.4f\n", mae_val))
cat(sprintf("R²   : %.4f (mô hình giải thích %.1f%% phương sai)\n", r2_val, r2_val * 100))

# So sánh dự đoán vs thực tế cho 10 quan sát đầu
cat("\n10 quan sát đầu - So sánh:\n")
so_sanh_b <- data.frame(
  Thuc_te = round(test_Y_b[1:10], 2),
  Du_doan = round(du_doan_boston[1:10], 2),
  Sai_so  = round(abs(test_Y_b[1:10] - du_doan_boston[1:10]), 2)
)
print(so_sanh_b)


# ══════════════════════════════════════════════════════════════════════════════
# PHẦN 3: BÀI TẬP THỰC HÀNH – CÂY QUYẾT ĐỊNH (Decision Tree) trên iris
# ══════════════════════════════════════════════════════════════════════════════

cat("\n\n========== BÀI 3: CÂY QUYẾT ĐỊNH - IRIS ==========\n\n")

# ------------------------------------------------------------------------------
# Bước 1: Đọc dữ liệu iris và nêu cấu trúc
# ------------------------------------------------------------------------------
# iris là bộ dữ liệu kinh điển trong ML, có sẵn trong R.
# 150 quan sát, 5 biến:
#   - Sepal.Length, Sepal.Width: chiều dài/rộng đài hoa
#   - Petal.Length, Petal.Width: chiều dài/rộng cánh hoa
#   - Species: loài hoa (setosa, versicolor, virginica) -> biến target
# Bài toán: phân loại 3 lớp (multi-class classification).

data(iris)

cat("--- Cấu trúc dữ liệu iris ---\n")
str(iris)
cat("\n--- Thống kê mô tả ---\n")
summary(iris)
cat("\n--- Phân bố biến Species ---\n")
print(table(iris$Species))
cat("=> Dữ liệu cân bằng: mỗi lớp 50 quan sát.\n")

# ------------------------------------------------------------------------------
# Bước 2: Tiền xử lý dữ liệu
# ------------------------------------------------------------------------------
cat("\n--- Bước 2: Tiền xử lý ---\n")

# 2a. Kiểm tra NA
cat("Số giá trị NA:", sum(is.na(iris)), "\n")

# 2b. Kiểm tra outlier cho các biến numeric
cat("\nKiểm tra outlier:\n")
cot_so_iris <- names(iris)[sapply(iris, is.numeric)]

for (ten_cot in cot_so_iris) {
  x <- iris[[ten_cot]]
  Q1 <- quantile(x, 0.25)
  Q3 <- quantile(x, 0.75)
  IQR_val <- Q3 - Q1
  so_outlier <- sum(x < Q1 - 1.5 * IQR_val | x > Q3 + 1.5 * IQR_val)
  cat(sprintf("  %s: %d outlier\n", ten_cot, so_outlier))
}

# 2c. Chuẩn hóa z-score (cho cây quyết định thực ra KHÔNG bắt buộc vì
# cây quyết định tách theo ngưỡng từng biến, không dùng khoảng cách.
# Nhưng đề bài yêu cầu tiền xử lý nên ta vẫn thực hiện.)
iris_features_scaled <- as.data.frame(scale(iris[, 1:4]))
iris_scaled <- iris_features_scaled
iris_scaled$Species <- iris$Species

cat("\nĐã chuẩn hóa z-score cho 4 biến numeric.\n")
cat("(Lưu ý: Cây quyết định không nhạy với scale, nhưng đây là bước\n")
cat(" tiền xử lý chuẩn theo yêu cầu bài tập.)\n")

# ------------------------------------------------------------------------------
# Bước 3: Chia dữ liệu 70/30
# ------------------------------------------------------------------------------
cat("\n--- Bước 3: Chia dữ liệu 70/30 ---\n")

set.seed(42)
chi_so_train_i <- createDataPartition(iris_scaled$Species, p = 0.7, list = FALSE)

train_iris <- iris_scaled[chi_so_train_i, ]
test_iris  <- iris_scaled[-chi_so_train_i, ]

cat("Tập train:", nrow(train_iris), "quan sát\n")
cat("Tập test :", nrow(test_iris), "quan sát\n")
cat("\nPhân bố Species trong train:\n")
print(table(train_iris$Species))
cat("Phân bố Species trong test:\n")
print(table(test_iris$Species))

# ------------------------------------------------------------------------------
# Bước 4: Xây dựng cây quyết định
# ------------------------------------------------------------------------------
# Nguyên lý thuật toán Decision Tree (CART):
#   - Tại mỗi node, chọn 1 biến và 1 ngưỡng để chia dữ liệu thành 2 nhánh
#     sao cho mỗi nhánh "thuần" hơn (homogeneous hơn) về lớp.
#   - Tiêu chí chọn: Gini impurity hoặc Information Gain (entropy).
#     + Gini = 1 - Σ(p_i²): đo mức độ "lẫn" các lớp. Gini = 0 => hoàn toàn
#       thuần (chỉ 1 lớp). Gini cao => nhiều lớp trộn lẫn.
#     + Chọn split nào giảm Gini nhiều nhất.
#   - Lặp lại đệ quy cho từng nhánh con => tạo thành cây.
#   - Điều kiện dừng: node quá nhỏ, cây quá sâu, hoặc không cải thiện thêm.
#   - Ưu điểm: dễ hiểu, giải thích được, không cần chuẩn hóa.
#   - Nhược điểm: dễ overfit nếu không prune (cắt tỉa).

cat("\n--- Bước 4: Xây dựng cây quyết định ---\n")

# rpart() xây cây quyết định
# method = "class" vì đây là bài toán phân loại
cay_quyet_dinh <- rpart(
  Species ~ .,           # Species là target, dấu chấm = tất cả biến còn lại
  data = train_iris,
  method = "class",      # Phân loại (nếu hồi quy thì method = "anova")
  control = rpart.control(
    minsplit = 10,        # Số quan sát tối thiểu trong node để tiếp tục chia
    cp = 0.01             # Complexity parameter: ngưỡng cải thiện tối thiểu
  )
)

# In thông tin cây
cat("\nThông tin cây quyết định:\n")
print(cay_quyet_dinh)

# In bảng CP (complexity parameter) - dùng để prune
cat("\nBảng CP (dùng để chọn mức prune tối ưu):\n")
printcp(cay_quyet_dinh)

# Vẽ cây (sẽ hiện trong cửa sổ plot của R/RStudio)
# rpart.plot vẽ cây đẹp, dễ đọc hơn plot() mặc định
rpart.plot(cay_quyet_dinh, 
           main = "Cây quyết định - Phân loại Species (iris)",
           extra = 104,      # Hiện tỷ lệ % và số quan sát ở mỗi node
           fallen.leaves = TRUE,
           shadow.col = "gray",
           roundint = FALSE)

cat("\n=> Đã vẽ cây quyết định. Xem trong cửa sổ Plots.\n")

# ------------------------------------------------------------------------------
# Bước 5: Dự đoán cho tập kiểm tra
# ------------------------------------------------------------------------------
cat("\n--- Bước 5: Dự đoán ---\n")

# predict() với type = "class" trả về lớp dự đoán
du_doan_tree <- predict(cay_quyet_dinh, newdata = test_iris, type = "class")

# Xem xác suất dự đoán cho từng lớp (không bắt buộc, nhưng hữu ích)
xac_suat_tree <- predict(cay_quyet_dinh, newdata = test_iris, type = "prob")

cat("10 quan sát đầu - So sánh:\n")
so_sanh_i <- data.frame(
  Thuc_te = test_iris$Species[1:10],
  Du_doan = du_doan_tree[1:10],
  Dung_sai = ifelse(test_iris$Species[1:10] == du_doan_tree[1:10], "ĐÚNG", "SAI")
)
print(so_sanh_i)

cat("\nXác suất dự đoán cho 5 quan sát đầu:\n")
print(round(xac_suat_tree[1:5, ], 4))

# ------------------------------------------------------------------------------
# Bước 6: Đánh giá độ chính xác
# ------------------------------------------------------------------------------
cat("\n--- Bước 6: Đánh giá mô hình ---\n")

bang_nham_lan_tree <- confusionMatrix(du_doan_tree, test_iris$Species)
print(bang_nham_lan_tree)

cat(sprintf("\n=> ACCURACY TỔNG THỂ: %.4f (%.2f%%)\n",
            bang_nham_lan_tree$overall["Accuracy"],
            bang_nham_lan_tree$overall["Accuracy"] * 100))

# Tổng kết chi tiết theo từng lớp
cat("\nSensitivity (Recall) theo từng lớp:\n")
print(round(bang_nham_lan_tree$byClass[, "Sensitivity"], 4))
cat("\nSpecificity theo từng lớp:\n")
print(round(bang_nham_lan_tree$byClass[, "Specificity"], 4))


# ══════════════════════════════════════════════════════════════════════════════
# TỔNG KẾT
# ══════════════════════════════════════════════════════════════════════════════

cat("\n\n==================== TỔNG KẾT ====================\n\n")
cat("Bài 1 - KNN GermanCredit:\n")
cat(sprintf("  k tốt nhất: %d | Accuracy: %.2f%%\n",
            k_tot_nhat, acc_tot_nhat * 100))

cat(sprintf("\nBài 2 - KNN Boston (hồi quy):\n"))
cat(sprintf("  k tốt nhất: %d | RMSE: %.4f | R²: %.4f\n",
            mo_hinh_knn_reg$bestTune$k, rmse_val, r2_val))

cat(sprintf("\nBài 3 - Decision Tree iris:\n"))
cat(sprintf("  Accuracy: %.2f%%\n",
            bang_nham_lan_tree$overall["Accuracy"] * 100))

cat("\n===================================================\n")
cat("Script hoàn tất. Cảm ơn đã chạy!\n")