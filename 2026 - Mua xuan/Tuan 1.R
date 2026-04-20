# Bài 1 -------------------------------------------------------------------
rm(list=ls()) #xoá môi trường làm việc
# xem mơ đưởng dẫn --------------------------------------------------------
getwd()
setwd("D:\\Google Drive Huandv\\Bai giang\\Data Mining\\GIANG - Lecture - Seminar 2025\\2026 - Mua xuan")
install.packages("dplyr", 
                 dependencies = T)
# mở dữ liệu --------------------------------------------------------------
data(mtcars)
dat <- mtcars
View(dat) # xem dữ liệu
str(dat) # xem cấu trúc dữ liệu
dat$cyl <- as.factor(dat$cyl)
rm(list=ls()) # xoá môi trường làm việc
# Nhập dữ liệu trực tiếp
# Cách 1
namsinh <- c(89, 70, 93, 93, 89, 92, 59, 94, 54, 69)
tienluong <- c(3250, 6960, 1100, 1100, 6140, 1400, 7500, 9120, 1020, 2760)
dat1 <- data.frame(namsinh, tienluong)
# Cách 2
dat2 <- data.frame(
  id = c(1, 2, 3, 4, 5),
  tuoi = c(30, 45, 19, 50, 39),
  chitieu = c(2300, 8300, 4500, 3400, 5600))
# Đọc dữ liệu file excel
dat3 <- edit(data.frame())
library(readxl)
dat4 <- read_excel("mtcars.xlsx",
            col_names = TRUE)
# Đọc dữ liệu file sav
library(haven)
dat5 <- read_sav("mtcars.sav")
# Đọc dữ liệu file csv
dat6 <- read.csv("mtcars_CSV.csv", sep = ";")
# XEM DỮ LIỆU
View(dat5)
str(dat5)
dim(dat4)
ncol(dat4)
nrow(dat4)
names(dat4)
head(mtcars)
tail(mtcars)
summary(mtcars$mpg)
summary(mtcars)
mtcars <-  edit(mtcars)
# LƯU DỮ LIỆU
save(dat5, file = "mtcars111.rda")
install.packages("writexl")
library(writexl)
write_xlsx(mtcars, "huan.xlsx")
# Gói dplyr -------------------------------------------------------------------
rm(list=ls())
library(dplyr)
data("mtcars")
rename(mtcars, miles.per.galons = mpg)
rename(mtcars, C1 = mpg, C2 = cyl, C3 = disp)
colnames(mtcars)[c(1,2)] <- c("so.km", "so.xy.lanh")
colnames(mtcars)[c(1,2)] <- c("mpg", "cyl")
select(mtcars, 1:3)
mtcars[-c(4:11)]
select(mtcars, 1, 5)
select(mtcars, c(1, 3, 5))

filter(mtcars, mpg>25)
filter(mtcars, mpg>20 & cyl ==6)
filter(mtcars, mpg>20 & mpg <30)

distinct(mtcars, cyl, .keep_all = F)
distinct(mtcars, cyl, .keep_all = T)       
distinct(mtcars, cyl, am, .keep_all = T)  

sample_frac(mtcars, 0.2, replace = T)
sample_n(mtcars, 5 , replace = T)
slice(mtcars, 5 : 10)
slice_max(mtcars, mpg, n = 5, with_ties = T)
slice_max(mtcars, cyl, n = 5, with_ties = F)

slice_min(mtcars, mpg, n = 5, with_ties = T) # lay 5 quan sat nho nhat
slice(mtcars, -(31 : 32))
slice(mtcars, 1:30)
mtcars[-(31:32),]
top_n(mtcars, 10, mpg)
top_frac(mtcars, 0.1, mpg)
arrange(mtcars, cyl, mpg)
arrange(mtcars, desc(cyl), mpg)
mutate(mtcars, km = 1.7*mpg, .after = 1)
mutate(mtcars, phanloai = case_when(
  mpg <20 ~ 1,
  mpg >=20 & mpg <30 ~ 2,
  mpg >=30 ~ 3), .after = 1)

mutate(mtcars, phanloai = case_when(
  mpg <20 ~ "Muc tieu thu thap",
  mpg >=20 & mpg <30 ~ "Muc tieu thu trung binh",
  mpg >=30 ~ "Muc tieu thu cao"), .after = 1)

summarise(mtcars, mean(mpg), median(mpg), mean(disp), n())

summarise(mtcars, "tieu thu trung binh" = mean(mpg), median(mpg), mean(disp), n())
summarise(mtcars, 
          across(.cols=c(1, 3, 5), list(mean, median, var)))

summarise(mtcars, 
          across(everything(), list(mean)))

# Cach 1
moi <- group_by(mtcars, cyl)
summarise(moi, mean(mpg), mean(disp))

# Cach 2
mtcars %>% 
  group_by(cyl) %>% 
  summarise(mean(mpg), mean(disp))

# CÁC LỆNH GHÉP NỐI DỮ LIỆU -----------------------------------------------
rm(list=ls())
library(tidyr)
sv <- data.frame(id=c(1,2,3,4,5,6,7), 
                 ho=c("Nguyen", "Le", "Do", "Nguyen", "Tran", "Le", "Pham"), 
                 dem=c("Lan", "Thanh", "Thi Huong", "Ngoc", "Thai", "Van", "Huu"), 
                 ten=c("Anh", "Binh", "Lan", "Huong", "Ha", "Quan", "Nghi"),
                 gioi=c("Nu", "Nam","Nu","Nu","Nu","Nam","Nam"))
diemtoan <- data.frame(id=c(1,2,3,4,5), diemtoan=c(10, 9, 9, 8, 6))
diemvan <- data.frame(id=c(3,4,5,6,7), diemvan=c(9, 6, 7, 8, 7))
diemtoanbs <- data.frame(id=c(5, 6,7), diemtoan=c(6, 6, 5))
# ghép cột
inner_join(sv, diemtoan)
left_join(sv, diemtoan)
right_join(sv, diemtoan)
full_join(sv, diemtoan)
# ghép dòng
intersect(diemtoan, diemtoanbs)
toan <- union(diemtoan, diemtoanbs)
setdiff(diemtoan, diemtoanbs)
setdiff(diemtoanbs, diemtoan)
# Ghép chung lại thành 1 cơ sở dữ liệu duy nhất
diem <- full_join(toan, diemvan)
chung <- full_join(sv, diem)
# Chuyển dữ liệu điểm thi thành dòng
a <- gather(chung, mon, diem, diemtoan, diemvan)
# Chuyển dữ liệu điểm thi thành cột
b <- spread(a, mon, diem)
chung$gioi <- gsub("Nam", "Anh", chung$gioi) 
chung$gioi <- gsub("Nu", "Chi", chung$gioi) 
colnames(chung) [5] <- "xungdanh"

c <- unite(chung, col = danhten, xungdanh, ho, dem, ten, sep = " ")
d <- separate(c, danhten, into = c ("xungdanh", "hovaten"), sep = 4)