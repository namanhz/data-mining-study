# LẬP BẢNG THỐNG KÊ -------------------------------------------------------
rm(list=ls())
# sử dụng dữ liệu mtcars
data("mtcars")
library(dplyr)
library(tidyr)
# Lập bảng mô tả số lượng xe theo số xy lanh
a <- table(mtcars$cyl)
a
addmargins(a)
addmargins(table(mtcars$cyl))
# Lập bảng mô tả tỷ trọng xe theo số xy lanh
100*prop.table(a)
round(100*prop.table(a), 2)
addmargins(100*prop.table(a))
# Lập bảng mô tả số lượng xe theo số xy lanh và kiểu động cơ vs
addmargins(table(mtcars$cyl, mtcars$vs)) 
# Lập bảng mô tả tỷ trọng xe theo số xy lanh và kiểu động cơ vs
b <- table(mtcars$cyl, mtcars$vs)
prop.table(table(mtcars$cyl, mtcars$vs))
prop.table(b, 1)
addmargins(prop.table(b, 2))
# Lập bảng mô tả số lượng xe theo số xy lanh và kiểu động cơ (vs) và hộp số
table(mtcars$cyl, mtcars$vs, mtcars$am)
library(tables)
# Lập bảng mô tả số lượng xe theo số xy lanh
tabular(as.factor(mtcars$cyl) ~ 1)
tabular(as.factor(mtcars$cyl)+1 ~ 1)
tabular(as.factor(mtcars$cyl) ~ Percent())
tabular(as.factor(mtcars$cyl) +1 ~ 1 + Percent())
tabular(as.factor(mtcars$am)+1 ~ as.factor(mtcars$cyl) +1 + Percent())
tabular(as.factor(mtcars$am)* as.factor(mtcars$gear) + 1 ~ as.factor(mtcars$cyl) +1 + Percent())

# Lập bảng hệ số tương quan 
cor(mtcars, method = "pearson")
cor(mtcars, method = "kendal")
cor(mtcars, method = "spearman")
# Lập bảng hệ số tương quan dùng gói Hmisc
library(Hmisc)
a <- rcorr(as.matrix(mtcars))
a$r
a$n
a$P
# BIỂU ĐỒ THỐNG KÊ --------------------------------------------------------
# Vẽ đồ thị phân phối của biến mpg
hist(mtcars$mpg)
# vẽ đồ thị hộp cho biến mpg
boxplot(mtcars$mpg)
# Vẽ đồ thị mối quan hệ giữa mpg và cyl
plot(mtcars$cyl, mtcars$mpg)
# Vẽ đồ thị điểm cho biến mpg
dotchart(mtcars$mpg, 
         main = "DO THI BIỂU DIỄN VỀ MỐI QUAN HỆ GIỮA   ", xlab = "tan so", ylab = "so luong")
# Vẽ đồ thị tỷ trọng theo cyl
b <- table(mtcars$cyl)
pie(b)
# Vẽ đồ thị cột theo cyl
barplot(b)
# Vẽ đồ thị mối quan hệ giữa mpg và cyl và đường hồi quy
plot(mtcars$wt, mtcars$mpg, 
     abline(lm(mtcars$mpg ~ mtcars$wt, data = mtcars), col = "blue"))
# SỬ DỤNG GÓI GGPLOT2
library(ggplot2)
# Chuyển biến cyl thành dạng factor
mtcars$cyl <- as.factor(mtcars$cyl)
# Vẽ đồ thị cột số lượng xe theo số xy lanh

ggplot(mtcars) +
  aes(cyl) +
  geom_bar(col = "black", fill = "BLUE") +
  labs(title = "BIỂU ĐỒ CỘT BIỂU DIỄN ....",
       x = "số xy lanh",
       y = "số lượng xe",
       caption = "Nguồn: cục Thống kê")



c <- ggplot(mtcars) +
  aes(cyl)+
  geom_bar(col = "red", fill = "orange")+
  labs(title = "Biểu đồ cột",
       x = "số xy lanh",
       y = "số lượng xe",
       caption = "Nguồn: cục Thống kê")
c  
# Vẽ đồ thị tương tác
library(plotly)
library(gganimate)
library(gifski)
library(png)

ggplotly(c)
#Vẽ đồ thị động
c+
  transition_states(vs)
# Vẽ đồ thị tương quan giữa mgp và qsec
ggplot(mtcars)+
  aes(mpg, qsec)+
  geom_point()+
  geom_smooth()
# Vẽ đồ thị cột 2 biến cyl và am
# chuyển biến am
mtcars$am <- as.factor(mtcars$am)
ggplot(mtcars)+
  aes(cyl, fill= am)+
  geom_bar(position = "dodge")
# Vẽ đồ thị cột 2 biến cyl và am
ggplot(mtcars)+
  aes(cyl, fill= am)+
  geom_bar(position = "stack")
# vẽ đồ thị tỷ trọng am theo cyl
ggplot(mtcars)+
  aes(cyl, fill= am)+
    geom_bar(position = "fill")
# Vẽ đồ thị phân bố mpg chia theo am
ggplot(mtcars)+
  aes(mpg, fill=am)+
  geom_density(alpha = 0.2)
# Vẽ đồ thị phân bố hp chia theo cyl
ggplot(mtcars)+
  aes(hp, fill = cyl)+
  geom_density(alpha = 0.4)
# Vẽ đồ thị tương quan giữa hp và mpg phân theo cyl
ggplot(mtcars) +
  aes(mpg, hp)+
  geom_point(aes(color=cyl))+
  geom_smooth(method = lm, col="red", alpha = 0.2)
# Vẽ đồ thị động hp và mpg
ggplot(mtcars)+
  aes(x = mpg, y = hp, size = drat, color = wt)+
  geom_point() + 
  transition_states(cyl, transition_length = 1)+
  shadow_mark()+
  shadow_trail()
# Đồ thị động 
ggplot(mtcars)+
  aes(cyl, mpg)+
  geom_boxplot(fill = "blue")+
  labs(title = "DO THI ",
       x = "So xy lanh",
       y = "so luong xe")+
  transition_states(cyl)+
  shadow_mark()+
  shadow_trail()
