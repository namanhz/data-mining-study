etwd("C:\\Users\\Admin\\Desktop\\NCD\\Data Mining\\Seminar\\Tuan 14")
library(dplyr)
library(tidyr)
library(ggplot2)
library(mice)
library(naniar)
library(visdat)
library(ggplot2)
library(plotly)
library(outliers)



install.packages("caret")
library(caret)


# bai1 --------------------------------------------------------------------
data("GermanCredit")
View(GermanCredit)

credit <- GermanCredit %>%
  slice(1:300) %>%
  select(1:10)

str(credit)

#4. Thực hiện tiền xử lý dữ liệu (từ dữ liệu credit):
#  a. Dữ liệu có NA không?
#  b. Dữ liệu có giá trị đột xuất không?
# c. Chuẩn hóa dữ liệu theo phương pháp z-score

anyNA(credit)
boxplot(credit)


credit1 <- preProcess(credit[1:7], method = c("center", "scale"))
credit_final <- predict(credit1, credit)                            #chuẩn hóa z score

#5. Chia dữ liệu credit thành 2 tập huấn luyện và tập kiểm tra theo tỷ lệ 80:20
set.seed(123)
training <- createDataPartition(credit_final$Class, p=0.8, list=FALSE)
training_set <- slice(credit_final, training)
test_set <- slice(credit_final, -training)

#cách 1 : CV lặp lại 3 lần
ctrl1 <- trainControl(method="repeatedcv", number=5, repeats = 3)


#6. Phân loại dữ liệu theo KNN với biến phân loại Class, chọn k tốt nhất trong 10 giá trị (nhỏ nhất) của k.
set.seed(123)
best_knn <- train(Class~.-Telephone -ForeignWorker, training_set,
                  method="knn",
                  trControl=ctrl1,            # nếu 0 có = chạy bootstrapping, nếu có chạy theo pp đc khai báo
                  na.action = na.omit,
                  tuneLength = 10)
best_knn
plot(best_knn)

best_knn$bestTune

#7. Thực hiện dự đoán cho biến phân loại Class đối với tập kiểm tra.
pred <- predict(best_knn, test_set)
pred

#8 Đánh giá độ chính xác của mô hình phân loại theo KNN
mean(pred == test_set$Class)          #0.7 = good good + bad bad / tổng
confusionMatrix(table(test_set$Class, pred))
                          #H0: Accuracy <= NIR
                          #H1: A        > NIR
                          #p_value   --> bỏ qua pp này vì kh tốt độ chính xác nhỏ hơn dự đoán ngẫu nhiên








set.seed(123)
training <- createDataPartition(credit_final$Class, p=0.8, list=FALSE)
training_set <- slice(credit_final, training)
test_set <- slice(credit_final, -training)

#cách 2 :TỰ ĐỘNG BOOTSTRAPING



#6. Phân loại dữ liệu theo KNN với biến phân loại Class, chọn k tốt nhất trong 10 giá trị (nhỏ nhất) của k.
set.seed(123)
best_knn <- train(Class~.-Telephone -ForeignWorker, training_set,
                  method="knn",
                             # nếu 0 có = chạy bootstrapping, nếu có chạy theo pp đc khai báo
                  na.action = na.omit,
                  tuneLength = 10)
best_knn
plot(best_knn)

best_knn$bestTune
#7. Thực hiện dự đoán cho biến phân loại Class đối với tập kiểm tra.
pred <- predict(best_knn, test_set)
pred

#8 Đánh giá độ chính xác của mô hình phân loại theo KNN
mean(pred == test_set$Class)          #0.7 = good good + bad bad / tổng
confusionMatrix(table(test_set$Class, pred))
#H0: Accuracy <= NIR
#H1: A        > NIR
#p_value   --> bỏ qua pp này vì kh tốt độ chính xác nhỏ hơn dự đoán ngẫu nhiên



# Bai2 --------------------------------------------------------------------

install.packages("MASS")
library(MASS)
data("Boston")
View(Boston)

anyNA(Boston)

set.seed(123)
training <- createDataPartition(Boston$medv, p=0.7, list=FALSE)
training_set <- slice(Boston, training)
test_set <- slice(Boston, -training)

set.seed(123)
best_knn <- train(medv~., training_set,
                  method="knn",
                  preProcess=c("center","scale"),
                  na.action = na.omit,
                  tuneLength = 10)
best_knn
best_knn$bestTune

pred <- predict(best_knn, test_set)
pred

mse = mean((test_set$medv - pred)^2)
mae = MAE(test_set$medv, pred)
rmse = RMSE(test_set$medv, pred)

# bai3 --------------------------------------------------------------------

data("iris")
anyNA(iris)

set.seed(123)
training <- createDataPartition(iris$Species, p=0.7, list=FALSE)
training_set <- slice(iris, training)
test_set <- slice(iris, -training)



#C1 : dùng rpart
install.packages("rpart")
library(rpart)



DT <- rpart(Species~., training_set, method = "class", cp =0 )
DT

print(DT)
summary(DT)
plotcp(DT)

install.packages("rpart.plot")
library(rpart.plot)

rpart.plot(DT, type =2, extra = 101, under = TRUE, cex = 0.8 )

pred <- predict(DT, test_set, type = "class")
pred
confusionMatrix(table(test_set$Species, pred))

#C2

DT <- train(Species~., data = training_set,
                  method="rpart",
                  trControl=trainControl(method = "cv", number=10),
                  tuneLength = 10,
                  preProcess = c("center", "scale"),
                  na.action = na.pass)
DT
