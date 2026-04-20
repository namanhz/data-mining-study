rm(list=ls())
library(dplyr)
library(ggplot2)
library(lattice)
library(caret)
data(iris)
iris[,-5] <- scale(iris[,-5]) 
training <- createDataPartition(iris$Species, p=0.7, list=FALSE)
# Phương pháp Hold out
training_set <- slice(iris, training)
test_set <- slice(iris, -training)
# Phương pháp k fold
ctrl <- trainControl(method="cv", number=5)
# Phân chia dữ liệu
x_train <- training_set[-5] 
x_test <- test_set[-5]
y_train <- training_set$Species 
y_test <- test_set$Species 
# Thuật toán
library(class)
# Thuật toán MH
model_knn <- knn(train=x_train, 
    test=x_test,
    cl=y_train,
    k=5)
model_knn
# Chọn K tốt nhất - phương pháp hold out
best_knn <- train(Species~., training_set,
                  method="knn",
                  tuneGrid=expand.grid(k=c(1:10)))
best_knn
plot(best_knn)
# thay tuneLength = 10 bằng tuneGrid=expand.grid(k=c(1:10)) 

# Chọn K tốt nhất -Phương pháp k fold
best_knn <- train(Species~., training_set,
                  method="knn",
                  trControl=ctrl,
                  tuneGrid = expand.grid(k=3:10))
best_knn
best_knn$bestTune
plot(best_knn)
# Gán dữ liệu
# Cách 1
model_knn <- knn(train=x_train, 
                 test=x_test,
                 cl=y_train,
                 k=best_knn$bestTune)
model_knn
# cách 2
pred <- predict(best_knn, test_set)
pred
# Đánh giá mô hình
confusionMatrix(table(test_set$Species, pred))
# DỮ LIỆU ĐỊNH LƯỢNG --------------------------------------------
rm(list=ls())
library(dplyr)
library(MASS)
data("Boston")
training <- createDataPartition(Boston$medv, p=0.8, list=FALSE)
training_set <- slice(Boston, training)
test_set <- slice(Boston, -training)
ctrl <- trainControl(method="repeatedcv", number=5, repeats = 3)
best_knn <- train(medv~., training_set,
                  preProcess=c("center", "scale"),
                  method="knn",
                  trControl=ctrl,
                  tuneGrid = expand.grid(k=3:15))
best_knn
plot(best_knn)
pred <- predict(best_knn, test_set)
pred
y_test <- test_set$medv 
# Đánh giá mô hình
mse = mean((y_test - pred)^2)
mae = caret::MAE(y_test, pred)
rmse = caret::RMSE(y_test, pred)
# Vẽ đồ thị
cat("MSE: ", mse, "MAE: ", mae, " RMSE: ", rmse)
plot(y_test, col="red", type="l")
lines(pred, col="blue")
legend("topright",
       legend=c("original-medv","predicted"),
       fill=c("red", "blue"),
       cex=0.7)
# CÂY QUYÉT ĐỊNH
rm(list = ls())
data(iris)
library(caret)
library(dplyr)
library(rpart)
library(rpart.plot)
library(class)
training <- createDataPartition(iris$Species, p=0.7, list=FALSE)
# Phương pháp Hold out
training_set <- slice(iris, training)
test_set <- slice(iris, -training)
# Phương pháp k fold
ctrl <- trainControl(method="cv", number=5)
# Phân chia dữ liệu
x_train <- training_set[-5] 
x_test <- test_set[-5]
y_train <- training_set$Species 
y_test <- test_set$Species 
# Cách 1: sử dụng package caret
caret <- train(Species~., training_set,
               method="rpart",
               trControl = ctrl,
               tuneLength = 10)
caret
rpart.plot(caret$finalModel)
# Cách 2: sử dụng package rpart
dt <- rpart(Species ~ ., 
            training_set, 
            method = "class", # phần mềm tự nhận nếu dữ liệu là class
            control = rpart.control(cp=0))
dt
printcp(dt)
plotcp(dt)
rpart.plot(dt, type=5, extra=104, under=TRUE, cex=1.7)
#DỰ ĐOÁN
x_test <- test_set[-5]
pred <- predict(dt, x_test, type="class")
confusionMatrix(pred, test_set$Species)
# Biến mục tiêu là định lượng 
rm(list=ls())
library(MASS)
data("Boston")
training_set <- slice(Boston, 1:400)
test_set <- slice(Boston, 401:506)
dt <- rpart(medv~crim+age+lstat+ptratio,
            training_set, 
            method="anova")
dt
printcp(dt)
plotcp(dt)
rpart.plot(dt, type=5, extra=100, under=TRUE, cex=0.8)
# KỸ THUẬT CẮT TỈA
# Xây dựng cây đầy đủ
dt <- rpart(medv~crim+age+lstat+ptratio,
            training_set, 
            method="anova",
            control=rpart.control(cp=0))
dt
printcp(dt)
plotcp(dt)
rpart.plot(dt, type=5, extra=100, under=TRUE, cex=0.7)
# TIÊU CHUẨN DỪNG
dt <- rpart(medv~crim+age+lstat+ptratio,
            training_set, 
            method="anova",
            control=rpart.control(minsplit = 10,
                                  minbucket = 3,
                                  maxdepth = 5))
rpart.plot(dt, type=5, extra=100, under=TRUE, cex=0.7)
# THUẬT TOÁN C5.0
library(C50)
rm(list = ls())
data(iris)
library(caret)
training <- createDataPartition(iris$Species, p=0.7, list=FALSE)
library(dplyr)
# Phương pháp Hold out
training_set <- slice(iris, training)
test_set <- slice(iris, -training)
# Phương pháp k fold
ctrl <- trainControl(method="cv", number=5)
# Phân chia dữ liệu
x_train <- training_set[-5] 
x_test <- test_set[-5]
y_train <- training_set$Species 
y_test <- test_set$Species 
model <- C5.0(Species ~ ., 
              training_set)
plot(model)

