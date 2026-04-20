rm(list=ls())
library(dplyr)
library(tidyr)
# Đọc dữ liệu attenu
data("attenu")
# Kiểm tra xem có dữ liệu đột xuất hay không?
anyNA(attenu)
is.na(attenu)
is.na(attenu$event)
sum(is.na(attenu))
table(is.na(attenu))
colSums(is.na(attenu))
rowSums(is.na(attenu))
# Vẽ đồ thị xem dữ liệu đột xuất
library(visdat)
library(VIM)
vis_dat(attenu)
vis_miss(attenu)
aggr(attenu, numbers= TRUE, prop = TRUE, sortVars = TRUE, sortCombs = TRUE)
# Thống kê biến
summary(aggr(attenu, numbers= TRUE, prop = TRUE, sortVars = TRUE, sortCombs = TRUE))
# Vẽ đồ thị
matrixplot(attenu)
# đổi biến station thành biến số
attenu$station <- as.numeric(attenu$station)
# Tính giá trị TB khi loại giá trị khuyết thiếu
summarise(attenu, TB=mean(station, na.rm = TRUE), pS=var(station, na.rm = TRUE), max(station, na.rm = TRUE), min(station, na.rm = TRUE))
# Vẽ đồ thị 
marginplot(attenu[c("station", "event")], numbers = TRUE, cex.numbers = 0.6)
# Kiểm định xác định cơ chế gây khuyết thiếu
library(naniar)
mcar_test(attenu)
# Điền giá trị khuyết thiếu
library(mice)
# Điền giá trị trung bình
complete(mice(attenu, method = "mean"))
# Cách 2
mutate(attenu, station = case_when
       (is.na(station) ~ (mean(station, na.rm=TRUE)), 
         TRUE ~ station))
# Điền giá trị ngẫu nhiên
hotdeck(attenu)
complete(mice(attenu, method = "sample"))
# Điền giá trị bằng hồi quy
complete(mice(attenu, method = "norm.predict"))
# Điền giá trị bằng hồi quy ngẫu nhiên
complete(mice(attenu, method = "norm.nob"))
# Điền giá trị bằng cây quyết định
complete(mice(attenu, method = "cart"))
# Điền giá trị bằng rừng ngẫu nhiên
complete(mice(attenu, method = "rf"))
# XEM XÉT DỮ LIỆU ĐỘT XUẤT
data("sleep")
LB <- mean(sleep$BodyWgt) - 3*sd(sleep$BodyWgt)
UB <- mean(sleep$BodyWgt) + 3*sd(sleep$BodyWgt)
filter(sleep, BodyWgt < LB | BodyWgt > UB )
hist(sleep$BodyWgt)
dtbox <- boxplot(sleep$BodyWgt)
dtbox$out
# Kiểm định dữ liệu đột xuất
library(outliers)
grubbs.test(sleep$BodyWgt, type = 11)
# Kiểm định dixon
small_sample <- sleep$BodyWgt[1:20]
dixon.test(small_sample, type = 11)
library(EnvStats)
rosnerTest(sleep$Gest)
