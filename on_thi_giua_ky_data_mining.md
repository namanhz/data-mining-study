# 📚 ÔN TẬP KHAI PHÁ DỮ LIỆU (Data Mining) – Tuần 1 → 13

> **Môn học**: Những nguyên lý cơ bản của Khai phá dữ liệu
> **Giảng viên**: TS Trần Thị Nga – Khoa Thống kê, ĐH KTQD
> **Phạm vi**: Tuần 1–13 (Lý thuyết + Bài tập code R)

> ⚠️ **QUY TẮC**: Tất cả câu lệnh trong file này CHỈ lấy từ slide bài giảng (`B_Tuan *.pdf`) và từ các file `.R` của giảng viên (`2026 - Mua xuan/*.R`) cộng `bai 13.R`. Không sử dụng thư viện/hàm ngoài phạm vi đó.

---

## 📋 MỤC LỤC

| Phần | Nội dung | Nguồn |
|------|----------|--------|
| 0 | Thiết lập môi trường | Tuần 1 |
| 1 | R cơ bản & Nhập/xuất dữ liệu | Tuần 1 |
| 2 | dplyr – 1 bộ dữ liệu | Tuần 1 |
| 3 | dplyr – 2 bộ dữ liệu (JOIN) | Tuần 3 |
| 4 | tidyr – Chỉnh hình dữ liệu | Tuần 3 |
| 5 | Lập bảng thống kê | Tuần 3 |
| 6 | Đồ thị (plot, ggplot2, plotly, gganimate) | Tuần 3 |
| 7 | Giới thiệu Khai phá Dữ liệu | Tuần 5 |
| 8 | Tiền xử lý dữ liệu (Missing + Outlier) | Tuần 7 |
| 9 | Phân cụm (Clustering) | Tuần 9 |
| 10 | Luật kết hợp (Association Rules) | Tuần 11 |
| 11 | Khai phá mẫu tuần tự | Tuần 11 |
| 12 | Phân loại (Classification) | Tuần 13 |
| 13 | Bài tập mẫu có lời giải | Bài 1–13 |
| 14 | Checklist ôn tập | — |

---

# PHẦN 0: THIẾT LẬP MÔI TRƯỜNG

```r
rm(list = ls())                      # xoá môi trường làm việc
getwd()                              # xem đường dẫn hiện tại
setwd("D:/path/to/folder")            # đổi đường dẫn

install.packages("dplyr")            # cài package
install.packages("dplyr", dependencies = TRUE)
library(dplyr)                       # gọi package

help(mean)                           # xem help
?mean                                # tương đương
data()                               # liệt kê dataset có sẵn
```

## Toán tử / ký hiệu

| Nhóm | Ký hiệu |
|------|---------|
| Gán | `<-`, `=`, `Alt -` |
| So sánh | `==`, `!=`, `<`, `>`, `<=`, `>=` |
| Logic | `&` (AND), `|` (OR), `!` (NOT) |
| Số học | `+`, `-`, `*`, `/`, `^`, `%%` (dư), `%/%` (nguyên) |
| Pipe (dplyr/magrittr) | `%>%` (Ctrl+Shift+M), `%<>%`, `%T>%`, `%$%` |
| Truy cập | `$` (vd: `mtcars$mpg`) |
| Ghi chú | `#` |

---

# PHẦN 1: R CƠ BẢN

## 1.1. Cấu trúc dữ liệu

| Kiểu | Mô tả | Ví dụ |
|------|-------|-------|
| `vector` | Dãy giá trị cùng kiểu | `c(1, 2, 3)` |
| `data.frame` | Bảng 2 chiều (cột khác kiểu OK) | `data.frame(x = 1:3, y = c("a","b","c"))` |
| `matrix` | Ma trận 2 chiều (cùng kiểu) | `matrix(1:6, nrow = 2)` |
| `list` | Chứa nhiều kiểu khác nhau | `list(a = 1, b = "hi")` |

## 1.2. Kiểu biến & Chuyển đổi

| Kiểu | Hàm chuyển đổi |
|------|----------------|
| Số | `as.numeric(x)` |
| Ký tự | `as.character(x)` |
| Logic | `as.logical(x)` |
| Phân loại (factor) | `as.factor(x)` |

## 1.3. Nhập dữ liệu

### Trực tiếp

```r
# Cách 1: ghép vector vào data.frame
namsinh   <- c(89, 70, 93, 93, 89, 92, 59, 94, 54, 69)
tienluong <- c(3250, 6960, 1100, 1100, 6140, 1400, 7500, 9120, 1020, 2760)
dat1 <- data.frame(namsinh, tienluong)

# Cách 2: tạo trực tiếp
dat2 <- data.frame(
  id = c(1, 2, 3, 4, 5),
  tuoi = c(30, 45, 19, 50, 39),
  chitieu = c(2300, 8300, 4500, 3400, 5600)
)

# Cách 3: nhập qua cửa sổ Editor
dat3 <- edit(data.frame())
```

### Dataset có sẵn

```r
data("mtcars")
data("iris")
data("airquality")
data("sleep")
data("USArrests")
data("Boston", package = "MASS")
data("GermanCredit", package = "caret")
load(file = "data.rda")
```

### Từ file Excel (`readxl`)

```r
library(readxl)
dat4 <- read_excel("mtcars.xlsx",
  sheet = 1,                  # hoặc tên sheet, hoặc NULL
  range = NULL,               # hoặc "A1:D20"
  col_names = TRUE)
```

### Từ file CSV (base)

```r
dat6 <- read.csv("mtcars_CSV.csv",
  header = TRUE,
  sep = ";",                  # hoặc ","
  dec = ".")                  # hoặc ","
```

### Từ file SPSS / Stata (`haven`)

```r
library(haven)
dat5 <- read_sav("mtcars.sav")
dat5 <- read_spss("mtcars.sav", col_select = 1:3)
dat5 <- read_dta("mtcars.dta")
```

## 1.4. Xem thông tin dữ liệu

```r
View(dat)                   # cửa sổ bảng
str(dat)                    # cấu trúc
dim(dat)                    # (dòng, cột)
nrow(dat); ncol(dat)
names(dat)                  # tên cột
head(dat, 10)               # 10 dòng đầu
tail(dat, 5)                # 5 dòng cuối
summary(dat)                # thống kê mô tả
summary(dat$mpg)            # 1 biến
mtcars <- edit(mtcars)       # sửa trực tiếp
```

## 1.5. Lưu dữ liệu

```r
save(dat5, file = "mtcars111.rda")

library(writexl)
write_xlsx(mtcars, "huan.xlsx", col_names = TRUE, format_headers = TRUE)
write_xlsx(list(sheet1 = mtcars, sheet2 = iris), "combined.xlsx")

library(haven)
write_sav(dat5, "output.sav")
write_dta(dat5, "output.dta")
```

---

# PHẦN 2: GÓI DPLYR – XỬ LÝ 1 BỘ DỮ LIỆU

> **Cấu trúc chung**: `verb(data, …)`. Có thể nối bằng `%>%`.

## 2.1. Đổi tên

```r
library(dplyr)
rename(mtcars, miles.per.galons = mpg)
rename(mtcars, C1 = mpg, C2 = cyl, C3 = disp)

colnames(mtcars)[c(1, 2)] <- c("so.km", "so.xy.lanh")
colnames(mtcars)[c(1, 2)] <- c("mpg", "cyl")

rownames(dat) <- dat[, 1]
```

## 2.2. Chọn cột & lọc dòng

```r
# SELECT
select(mtcars, 1:3)
select(mtcars, 1, 5)
select(mtcars, c(1, 3, 5))
mtcars[-c(4:11)]                  # bỏ cột 4-11

# FILTER
filter(mtcars, mpg > 25)
filter(mtcars, mpg > 20 & cyl == 6)
filter(mtcars, mpg > 20 & mpg < 30)

# DISTINCT
distinct(mtcars, cyl, .keep_all = FALSE)
distinct(mtcars, cyl, .keep_all = TRUE)
distinct(mtcars, cyl, am, .keep_all = TRUE)
```

## 2.3. Lấy mẫu ngẫu nhiên

```r
sample_frac(mtcars, 0.2, replace = TRUE)
sample_n(mtcars, 5, replace = TRUE)
```

## 2.4. Chọn theo vị trí

```r
slice(mtcars, 5:10)
slice(mtcars, -(31:32))              # bỏ dòng
slice_max(mtcars, mpg, n = 5, with_ties = TRUE)
slice_max(mtcars, cyl, n = 5, with_ties = FALSE)
slice_min(mtcars, mpg, n = 5, with_ties = TRUE)

top_n(mtcars, 10, mpg)
top_frac(mtcars, 0.1, mpg)
bottom_n(mtcars, 5, mpg)
bottom_frac(mtcars, 0.1, mpg)
```

## 2.5. Sắp xếp

```r
arrange(mtcars, cyl, mpg)
arrange(mtcars, desc(cyl), mpg)
```

## 2.6. Tạo biến mới (mutate, case_when, transmute)

```r
mutate(mtcars, km = 1.7 * mpg, .after = 1)

mutate(mtcars, phanloai = case_when(
  mpg < 20                  ~ 1,
  mpg >= 20 & mpg < 30      ~ 2,
  mpg >= 30                 ~ 3
), .after = 1)

mutate(mtcars, phanloai = case_when(
  mpg < 20                  ~ "Muc tieu thu thap",
  mpg >= 20 & mpg < 30      ~ "Muc tieu thu trung binh",
  mpg >= 30                 ~ "Muc tieu thu cao"
), .after = 1)

# Tùy chọn .keep / .before / .after
mutate(dat, new = x * 2, .keep = "all")         # giữ tất cả cột
mutate(dat, new = x * 2, .keep = "used")        # chỉ cột tham gia
mutate(dat, new = x * 2, .before = 2)           # chèn vị trí 2

# transmute: chỉ giữ cột mới
transmute(iris, sepal = Sepal.Length + Sepal.Width)
```

## 2.7. Tổng hợp (summarise)

```r
summarise(mtcars, mean(mpg), median(mpg), mean(disp), n())
summarise(mtcars, "tieu thu trung binh" = mean(mpg), median(mpg), mean(disp), n())

# Nhiều hàm, nhiều cột
summarise(mtcars, across(.cols = c(1, 3, 5), list(mean, median, var)))
summarise(mtcars, across(everything(), list(mean)))
```

### Hàm tóm tắt phổ biến

| Hàm | Ý nghĩa |
|-----|---------|
| `mean(x)` | Trung bình |
| `median(x)` | Trung vị |
| `sd(x)`, `var(x)` | Độ lệch chuẩn, phương sai |
| `min(x)`, `max(x)` | Nhỏ nhất, lớn nhất |
| `sum(x)` | Tổng |
| `n()` | Số quan sát |
| `n_distinct(x)` | Số giá trị khác nhau |
| `first(x)`, `last(x)`, `nth(x, k)` | Giá trị đầu/cuối/thứ k |
| `IQR(x)` | Khoảng tứ phân vị |

> ⚠️ Nếu có NA thì thêm `na.rm = TRUE` vào hàm thống kê.

## 2.8. Gom nhóm (group_by)

```r
# Cách 1: gán trung gian
moi <- group_by(mtcars, cyl)
summarise(moi, mean(mpg), mean(disp))

# Cách 2: pipe
mtcars %>%
  group_by(cyl) %>%
  summarise(mean(mpg), mean(disp))

ungroup(iris)
```

## 2.9. Đếm & xếp hạng

```r
count(iris, Species, wt = Sepal.Length)

# Window functions (cheatsheet)
dense_rank(x); min_rank(x); percent_rank(x); row_number(x); ntile(x, 4); cume_dist(x)
lead(x); lag(x); between(x, a, b)
cumall(x); cumany(x); cummean(x); cumsum(x); cummax(x); cummin(x); cumprod(x)
pmax(x, y); pmin(x, y)
```

---

# PHẦN 3: GÓI DPLYR – GHÉP 2 BỘ DỮ LIỆU

## 3.1. Mutating joins (cần biến chung `key`)

```r
inner_join(d1, d2, by = "key")      # chỉ giữ quan sát chung
left_join(d1, d2, by = "key")       # giữ tất cả d1
right_join(d1, d2, by = "key")      # giữ tất cả d2
full_join(d1, d2, by = "key")       # giữ tất cả hai

# Filtering joins
semi_join(d1, d2, by = "key")       # giữ d1 có mặt trong d2
anti_join(d1, d2, by = "key")       # giữ d1 không có trong d2
```

## 3.2. Set operations (cùng cấu trúc cột)

```r
intersect(d1, d2)           # dòng chung
union(d1, d2)               # tất cả (bỏ trùng)
setdiff(d1, d2)             # trong d1 không có trong d2
```

## 3.3. Nối đơn giản

```r
bind_rows(d1, d2)           # nối dòng
bind_cols(d1, d2)           # nối cột (phải cùng số dòng)
```

---

# PHẦN 4: GÓI TIDYR – CHỈNH HÌNH DỮ LIỆU

```r
library(tidyr)

# GATHER – wide → long
gather(diemthi, mon, diem, van, ngoaingu, toan)

# SPREAD – long → wide
spread(pollution, size, amount)

# UNITE – gộp cột
unite(dat, col = "ten_moi", col1, col2, sep = "_", remove = TRUE)

# SEPARATE – tách 1 cột
separate(storms, date, into = c("y", "m", "d"), sep = "-", remove = TRUE)

# GSUB – thay ký tự
gsub("wk", "", dat$week)

# DROP_NA – xóa dòng có NA (sẽ gặp lại ở Phần 8)
drop_na(dat)
drop_na(dat, col1)
```

---

# PHẦN 5: LẬP BẢNG THỐNG KÊ

## 5.1. `table` + tần suất (base)

```r
# Bảng tần số
a <- table(mtcars$cyl)
addmargins(a)

# Bảng tỷ trọng (%)
100 * prop.table(a)
round(100 * prop.table(a), 2)
addmargins(100 * prop.table(a))

# Bảng 2/3 chiều
b <- table(mtcars$cyl, mtcars$vs)
addmargins(b)
prop.table(b)
prop.table(b, 1)             # theo dòng
prop.table(b, 2)             # theo cột
addmargins(prop.table(b, 2))
table(mtcars$cyl, mtcars$vs, mtcars$am)
```

## 5.2. `tabular` (package `tables`)

```r
library(tables)
# Cú pháp: tabular(dòng ~ cột), dùng + (cộng), * (phân tổ kết hợp), 1 (tần số)
tabular(as.factor(mtcars$cyl) ~ 1)
tabular(as.factor(mtcars$cyl) + 1 ~ 1)                       # có tổng
tabular(as.factor(mtcars$cyl) ~ Percent())
tabular(as.factor(mtcars$cyl) + 1 ~ 1 + Percent())
tabular(as.factor(mtcars$am) + 1 ~ as.factor(mtcars$cyl) + 1 + Percent())
tabular(as.factor(mtcars$am) * as.factor(mtcars$gear) + 1 ~
        as.factor(mtcars$cyl) + 1 + Percent())

# Lưu bảng
write.csv.tabular(bang, file = "output.csv")
```

## 5.3. Hệ số tương quan

```r
cor(mtcars, method = "pearson")
cor(mtcars, method = "kendal")
cor(mtcars, method = "spearman")

library(Hmisc)
a <- rcorr(as.matrix(mtcars))
a$r                         # hệ số tương quan
a$n                         # số quan sát
a$P                         # p-value
```

---

# PHẦN 6: ĐỒ THỊ

## 6.1. Base R

```r
hist(mtcars$mpg)
boxplot(mtcars$mpg)
plot(mtcars$cyl, mtcars$mpg)
plot(mtcars$wt, mtcars$mpg,
     abline(lm(mtcars$mpg ~ mtcars$wt, data = mtcars), col = "blue"))
dotchart(mtcars$mpg,
  main = "Biểu đồ điểm", xlab = "tan so", ylab = "so luong")

b <- table(mtcars$cyl)
pie(b)
barplot(b)
```

## 6.2. ggplot2

> **Cấu trúc**: `ggplot(data) + aes(...) + geom_*() + labs() + theme_*()`

```r
library(ggplot2)
mtcars$cyl <- as.factor(mtcars$cyl)
mtcars$am  <- as.factor(mtcars$am)

# Cột (bar)
ggplot(mtcars) +
  aes(cyl) +
  geom_bar(col = "black", fill = "BLUE") +
  labs(title = "BIỂU ĐỒ CỘT",
       x = "số xy lanh", y = "số lượng xe",
       caption = "Nguồn: cục Thống kê")

# 2 biến – cộng dồn / xếp chồng / tỷ trọng
ggplot(mtcars) + aes(cyl, fill = am) + geom_bar(position = "dodge")
ggplot(mtcars) + aes(cyl, fill = am) + geom_bar(position = "stack")
ggplot(mtcars) + aes(cyl, fill = am) + geom_bar(position = "fill")

# Scatter + hồi quy
ggplot(mtcars) +
  aes(mpg, qsec) +
  geom_point() + geom_smooth()

ggplot(mtcars) +
  aes(mpg, hp) +
  geom_point(aes(color = cyl)) +
  geom_smooth(method = lm, col = "red", alpha = 0.2)

# Mật độ
ggplot(mtcars) + aes(mpg, fill = am)  + geom_density(alpha = 0.2)
ggplot(mtcars) + aes(hp,  fill = cyl) + geom_density(alpha = 0.4)

# Boxplot
ggplot(mtcars) + aes(cyl, mpg) +
  geom_boxplot(fill = "blue") +
  labs(title = "Boxplot", x = "So xy lanh", y = "so luong xe")
```

### Cấu trúc đầy đủ của ggplot

Layers (ngăn bằng `+`): `aes`, `geom_*`, `facet_*`, `stat_*`, `coord_*`, `scale_*`, `theme_*`, `theme()`, `labs()`.

```r
# theme + facet
ggplot(dat, aes(value)) + geom_histogram() + facet_wrap(~ group)
theme(legend.position = "top")   # "bottom"/"right"/"left"
```

## 6.3. `ggcorrplot`

```r
library(ggcorrplot)
ggcorrplot(cor(mtcars),
  method = "circle",            # hoặc "square"
  type = "upper",               # "lower" / "full"
  lab = TRUE,
  lab_size = 3,
  legend.title = "Corr",
  colors = c("blue", "white", "red"),
  outline.color = "gray",
  hc.order = FALSE)
```

## 6.4. Đồ thị tương tác & động

```r
library(plotly)
c <- ggplot(mtcars) + aes(cyl) + geom_bar()
ggplotly(c)

library(gganimate); library(gifski); library(png)
c + transition_states(vs)

ggplot(mtcars) +
  aes(x = mpg, y = hp, size = drat, color = wt) +
  geom_point() +
  transition_states(cyl, transition_length = 1) +
  shadow_mark() +
  shadow_trail()

# transition_time(biến), transition_reveal(biến), anim_save("out.gif")
```

---

# PHẦN 7: GIỚI THIỆU KHAI PHÁ DỮ LIỆU (Tuần 5 – LT)

**Khai phá dữ liệu (Data Mining)** = hệ thống phương pháp áp dụng cho CSDL lớn, phức tạp để loại bỏ yếu tố ngẫu nhiên, khám phá mẫu/mô hình, quy luật tiềm ẩn. Là lĩnh vực **liên ngành**: CSDL + Thống kê + Thuật toán + Máy học + Trực quan hóa.

## Quy trình KDD

```
Dữ liệu vào → Tiền xử lý → Khai phá dữ liệu → Đánh giá mô hình → Tri thức
```

## Phân loại kỹ thuật

| Loại | Phương pháp | Học |
|------|-------------|-----|
| **Mô tả** | Phân cụm (Clustering) | Không giám sát |
| | Luật kết hợp (Association Rules) | Không giám sát |
| | Phát hiện bất thường | Cả hai |
| **Dự đoán** | Phân loại (Classification) | Có giám sát |
| | Hồi quy (Regression) | Có giám sát |
| | Dãy số thời gian | Có giám sát |

## Dữ liệu

| Có cấu trúc | Phi cấu trúc |
|-------------|--------------|
| Bảng / dòng / cột | Hình ảnh, video, email, văn bản |
| ~20% dữ liệu DN | ~80% dữ liệu DN |

**Thuật toán phổ biến** (theo slide): Regression, Decision Trees/Rules, Clustering, Visualization, Random Forests, K-Nearest Neighbours, Time Series, Ensemble Methods, Text Mining, PCA, Boosting, Neural Networks / Deep Learning, Gradient Boosted Machines, Anomaly Detection, CNN, SVM.

---

# PHẦN 8: TIỀN XỬ LÝ DỮ LIỆU (Tuần 7)

4 kỹ thuật: **Tích hợp → Làm sạch → Chuyển đổi → Rút gọn**. Chất lượng dữ liệu: Kịp thời, Đầy đủ, Chính xác, Nhất quán, Tin cậy, Diễn giải được.

## 8.1. Cơ chế khuyết thiếu

| Cơ chế | Phân phối | Liên quan đến | Xử lý |
|--------|-----------|--------------|-------|
| **MCAR** | Ngẫu nhiên | Không biến nào | Loại bỏ / Thay thế |
| **MAR** | Phi ngẫu nhiên | Biến khác | Thay thế (chuyên sâu) |
| **MNAR** | Phi ngẫu nhiên | Chính biến có NA | Thu thập thêm |

Mẫu NA: Univariate / Monotone / General.

## 8.2. Phát hiện NA

```r
anyNA(attenu)
is.na(attenu)
is.na(attenu$event)
sum(is.na(attenu))
table(is.na(attenu))
colSums(is.na(attenu))
rowSums(is.na(attenu))
```

## 8.3. Đồ thị NA

```r
library(visdat)
vis_dat(attenu)
vis_miss(attenu)

library(plotly)
ggplotly(vis_dat(attenu))

library(VIM)
aggr(attenu, numbers = TRUE, prop = TRUE, sortVars = TRUE, sortCombs = TRUE)
summary(aggr(attenu, numbers = TRUE, prop = TRUE, sortVars = TRUE, sortCombs = TRUE))
matrixplot(attenu)
marginplot(attenu[c("station", "event")], numbers = TRUE, cex.numbers = 0.6)
```

## 8.4. Kiểm định cơ chế khuyết

```r
library(naniar)
mcar_test(attenu)            # H0: MCAR ; H1: MAR
```

## 8.5. Xử lý NA

### Xóa

```r
na.omit(dat)
drop_na(dat)                 # tidyr
drop_na(dat, col1)
dat[colSums(is.na(dat)) == 0]     # bỏ cột có NA
```

### Thay bằng giá trị cố định

```r
# Cách 1: dplyr
library(dplyr)
mutate(attenu, station = case_when(
  is.na(station) ~ mean(station, na.rm = TRUE),
  TRUE ~ station
))

# Cách 2: mice
library(mice)
complete(mice(attenu, method = "mean"))
```

### Thay ngẫu nhiên

```r
complete(mice(attenu, method = "sample"))
hotdeck(attenu)              # VIM
```

### Hồi quy

```r
# Tự viết (slide)
mo_moi <- lm(y ~ x, data = dat)
summary(mo_moi)
dat %>% mutate(y = case_when(
  is.na(y) ~ predict(mo_moi, .),
  TRUE ~ y
))

# mice
complete(mice(attenu, method = "norm.predict"))   # hồi quy thường
complete(mice(attenu, method = "norm.nob"))       # hồi quy ngẫu nhiên
complete(mice(attenu, method = "cart"))           # cây quyết định
complete(mice(attenu, method = "rf"))             # rừng ngẫu nhiên
```

## 8.6. Dữ liệu nhiễu vs Đột xuất (Outlier)

| | Nhiễu (Noise) | Đột xuất (Outlier) |
|-|---------------|--------------------|
| Bản chất | Không phải giá trị thực | Có thể là giá trị thực |
| Ảnh hưởng | Overfit | Tăng phương sai |
| Phân phối | Theo phân phối dữ liệu | Không theo phân phối |

### Z-score (mean ± 3·sd)

```r
LB <- mean(sleep$BodyWgt) - 3 * sd(sleep$BodyWgt)
UB <- mean(sleep$BodyWgt) + 3 * sd(sleep$BodyWgt)
filter(sleep, BodyWgt < LB | BodyWgt > UB)
```

### Hampel (median ± 3·mad)

```r
LB <- median(dat$x) - 3 * mad(dat$x)
UB <- median(dat$x) + 3 * mad(dat$x)
filter(dat, x < LB | x > UB)
```

### Đồ thị

```r
hist(sleep$BodyWgt)
dtbox <- boxplot(sleep$BodyWgt)
dtbox$out                                    # các giá trị đột xuất
```

### Kiểm định

```r
library(outliers)
grubbs.test(sleep$BodyWgt, type = 10)        # 1 outlier, 1 phía
grubbs.test(sleep$BodyWgt, type = 11)        # 1 outlier, 2 phía
# options: opposite = FALSE/TRUE, two.sided = FALSE/TRUE

small_sample <- sleep$BodyWgt[1:20]
dixon.test(small_sample, type = 11)          # mẫu nhỏ

library(EnvStats)
rosnerTest(sleep$Gest)
rosnerTest(dat$x, k = 3, alpha = 0.05)
```

---

# PHẦN 9: PHÂN CỤM (Tuần 9)

## 9.1. Khái niệm

**Phân cụm** = học **không giám sát**, chia quan sát thành các cụm sao cho trong cụm giống nhau, khác cụm khác nhau.

Nhóm thuật toán:
- **Phân cấp (Hierarchical)**: AGNES (agglomerative), DIANA (divisive). Linkage: centroid, single, average, complete, radius, diameter.
- **Phân hoạch**: K-means (Hartigan-Wong 1979, McQueen 1967, Lloyd 1957/1982), K-medoids/PAM (Kaufmann & Rousseeuv 1987), CLARA (1990), CLARANS (Ng & Han 1994).
- **Dữ liệu định tính**: K-modes.

**Khoảng cách**: Euclid, Manhattan, Minkowski, Pearson, Chebychev, Cosine Similarity.

**Chọn số cụm k**: Elbow (WSS), Silhouette, Gap-statistic (Bootstrap).

## 9.2. Phân cụm phân cấp (hclust)

```r
library(datasets)
data("USArrests")
dat <- USArrests
d  <- dist(dat)              # ma trận khoảng cách
hc <- hclust(d)
plot(hc)                     # dendrogram

library(ggdendro)
library(ape)
ggdendrogram(hc)
ggdendrogram(hc, rotate = TRUE)

# Cắt cây thành k cụm
clus3 <- cutree(hc, 3)
clus3

# Tô màu theo cụm
colors <- c("red", "blue", "green", "yellow")
plot(as.phylo(hc), tip.color = colors[clus3], label.offset = 1, cex = 0.7)
plot(as.phylo(hc), tip.color = colors[clus3], label.offset = 1, cex = 0.7, type = "fan")

# Gán cụm vào dữ liệu
library(dplyr)
b <- as.data.frame(clus3)
USArrests_cl <- bind_cols(b, USArrests)
USArrests_cl %>%
  group_by(clus3) %>%
  summarise(mean(Murder), mean(Assault), mean(UrbanPop), mean(Rape))
```

## 9.3. K-means

```r
library(factoextra)
df <- scale(USArrests)       # chuẩn hóa z-score

# Chọn k tối ưu
fviz_nbclust(df, kmeans, method = "wss") + labs(subtitle = "Elbow method")
fviz_nbclust(df, kmeans, method = "silhouette") + labs(subtitle = "Silhouette")
fviz_nbclust(df, kmeans, nstart = 25, method = "gap_stat", nboot = 50) +
  labs(subtitle = "Gap statistic method")

# Chạy k-means
km <- kmeans(df, 3, nstart = 25)
km
km$centers
km$withinss
km$tot.withinss
km$iter

# Đồ thị
fviz_cluster(km, df)
fviz_cluster(km, df, ellipse.type = "norm")

# Cây phân cụm qua eclust
hc_e <- eclust(df, "hclust")
fviz_dend(hc_e, rect = TRUE)

# Gán cụm + TB theo cụm
library(cluster)
a <- as.data.frame(km$cluster)
USArrests_cl <- bind_cols(a, USArrests)
USArrests_cl %>%
  group_by(km$cluster) %>%
  summarise(mean(Murder), mean(Assault), mean(UrbanPop), mean(Rape))

# Đánh giá bằng silhouette
sl <- silhouette(km$cluster, dist(df))
fviz_silhouette(sl)
```

## 9.4. PAM (Partitioning Around Medoids)

```r
library(fpc); library(factoextra); library(cluster)
Arrest <- USArrests
Arrest <- na.omit(Arrest)
Arrest <- scale(Arrest)

pam3 <- pam(Arrest, 3, metric = "euclidean", stand = FALSE)
print(pam3)
pam3$medoids
head(pam3$clustering)

dd <- cbind(Arrest, cluster = pam3$cluster)
head(dd, n = 10)

# 4 cụm
pam4 <- pam(Arrest, 4, metric = "euclidean", stand = FALSE)
print(pam4)
pam4$medoids
head(pam4$clustering)
```

## 9.5. CLARA (cho dữ liệu lớn)

```r
library(cluster)
USA_clara <- USArrests
clarax <- clara(USA_clara[1:4], 3)
print(clarax)
plot(USA_clara, col = clarax$cluster)
```

## 9.6. K-modes (dữ liệu định tính)

```r
library(klaR)
library(scatterplot3d)
# setwd("D:/.../2026 - Mua xuan")
dat <- read.csv("babies.csv", sep = ",")
dat1 <- dat[, -1]
rownames(dat1) <- dat[, 1]
dat2 <- dat1[c(4, 6, 7, 10:12)]
str(dat2)

cl <- kmodes(dat2, 4, iter.max = 200, weighted = FALSE, fast = TRUE)
cl
cl$modes
cl$size

dat3 <- cbind(dat2, cl$cluster)
colnames(dat3)[7] <- "cluster"
```

---

# PHẦN 10: LUẬT KẾT HỢP (Tuần 11)

## 10.1. Khái niệm

- **Item**, **Itemset** (k-itemset), **Transaction**.
- **Association rule**: A → B.
- **Support** = n(X∪Y) / N
- **Confidence** = n(X∪Y) / n(X)
- **Lift** = Confidence / P(Y). Lift > 1: tương quan; = 1: độc lập; < 1: đẩy nhau.
- **Frequent itemset**: support ≥ min_sup.
- **Strong association rule**: support ≥ min_sup & confidence ≥ min_conf.

**Thuật toán**: Apriori (Agrawal & Srikant, 1993), FP-tree / FP-Growth (Han 2000), IT-tree / Eclat (Zaki 1997).

**Ví dụ**: Beer → Diaper (60%, 100%); Diaper → Beer (60%, 75%).

## 10.2. Chuẩn bị dữ liệu

```r
doituong$tenbien <- as.factor(doituong$tenbien)
```

## 10.3. Apriori (`arules`)

```r
library(arules)
# setwd("D:/.../2026 - Mua xuan")
trans <- read.transactions("benh_nhan_data.csv",
                           format = "basket",
                           sep = ",",
                           rm.duplicates = FALSE)
summary(trans)

# Apriori đầy đủ tham số
rules <- apriori(trans, control = list(verbose = FALSE),
  parameter  = list(minlen = 1, support = 0.1, conf = 0.3))
quality(rules) <- round(quality(rules), digits = 3)
rules <- sort(rules, by = "lift")
inspect(rules)
# (slide): inspect(sort(rules, by = "lift"))

# Loại luật thừa
redundant <- is.redundant(rules, measure = "confidence")
rule1 <- rules[!redundant]
inspect(rule1)

# Chỉ xem luật có RHS = COVID-19
rules2 <- apriori(trans, control = list(verbose = FALSE),
  parameter = list(minlen = 1, support = 0.1, conf = 0.3),
  appearance = list(rhs = c("COVID-19"), default = "lhs"))
inspect(sort(rules2, by = "lift"))
```

## 10.4. FP-Growth (`rCBA`)

```r
library(rCBA)
library(rJava)
rules3 <- rCBA::fpgrowth(trans,
  support = as.numeric(0.1),
  confidence = as.numeric(0.3),
  maxLength = as.integer(5),
  consequent = NULL,
  verbose = TRUE, parallel = FALSE)
```

## 10.5. IT-tree / Eclat (`arules`)

```r
library(arules)
rules <- eclat(trans, parameter = list(supp = 0.1, maxlen = 5))
inspect(sort(rules, by = "support"))
```

---

# PHẦN 11: KHAI PHÁ MẪU TUẦN TỰ (Tuần 11)

## 11.1. Khái niệm

- **Sequence** s = ⟨s₁ s₂ … s_n⟩ — các itemset sắp thứ tự theo thời gian.
- **Length** = số event; **Size** = tổng số item.
- **Support** = tỷ lệ đối tượng chứa chuỗi.
- **Frequent sequential pattern**: support ≥ min_sup.
- **Maximal sequential pattern**: không phải con của chuỗi phổ biến khác.
- **GSP (Generalized Sequential Pattern)**: tương tự Apriori cho chuỗi.

**Ứng dụng**: bán lẻ/TMĐT, y tế (DNA, triệu chứng), giáo dục (lộ trình học), tài chính (gian lận thẻ).

## 11.2. SPADE (`arulesSequences`)

```r
library(arules)
library(arulesSequences)
library(dplyr)
# setwd("D:/.../2026 - Mua xuan")

# Đọc dữ liệu dạng transactions cho chuỗi
patient_seqs <- read_baskets("medical_seq.txt",
  info = c("sequenceID", "eventID", "size"))

# Chạy SPADE: support = 0.1 → xuất hiện ở ≥ 10% đối tượng
s1 <- cspade(patient_seqs,
  parameter = list(support = 0.1, maxsize = 1, maxlen = 4),
  control   = list(verbose = TRUE))

# Chuyển sang data.frame + sắp xếp theo support
s1_df <- as(s1, "data.frame")
s1_df <- s1_df[order(-s1_df$support), ]
print("Các chuỗi tuần tự y tế tìm thấy:")
head(s1_df, 50)
```

---

# PHẦN 12: PHÂN LOẠI (Tuần 13)

## 12.1. Khái niệm

**Phân loại** = học **có giám sát**, dự đoán biến mục tiêu (nhãn hoặc số). Thuật toán slide đề cập: K-Nearest Neighbor (KNN) – lazy learning; Decision Tree (CART, ID3, C4.5, C5.0, Chi-Square, Reduction in Variance) – eager learning; Random Forest; Support Vector Machine (SVM).

### Các chỉ số tách (Decision Tree)

- **CART (phân loại)**: Gini `G(i) = 1 − Σp(j|i)²`; `G_split = Σ(n_i/n)·G_i` (càng nhỏ càng tốt).
- **CART (hồi quy)**: SDR, RMSE/SS/SSE/SSD.
- **ID3/C4.5/C5.0**: Entropy, Gain, GainRatio, SplitINFO.

### Tiêu chuẩn dừng / cắt tỉa

- **Pre-pruning**: node thuần, giá trị giống nhau, số quan sát < ngưỡng, Gini/Entropy không cải thiện.
- **Post-pruning**: Subtree replacement (bottom-up), Subtree raising (top-down).

### KNN

- Khoảng cách Euclid: `d(x,y) = √Σ(x_i − y_i)²`
- Manhattan: `d(x,y) = Σ|x_i − y_i|`
- Phân loại: nhãn đa số trong k hàng xóm.
- Hồi quy: trung bình y của k hàng xóm.

### Chỉ số đánh giá (slide)

- **Accuracy** = (TP+TN)/Tổng ; **Error rate** = 1 − Accuracy
- **Precision (PPV)** = TP/(TP+FP)
- **Sensitivity / Recall** = TP/(TP+FN)
- **Specificity** = TN/(TN+FP)
- **NPV** = TN/(TN+FN)
- **Kappa** = (Accuracy − Random) / (1 − Random)
- **F1** = 2·Precision·Sensitivity / (Precision + Sensitivity)
- **Lift (positive)** = (TP/(TP+FP)) / ((TP+FN)/Tổng)
- Hồi quy: **MSE**, **MAE**, **RMSE**.

## 12.2. Chuẩn bị: chia train/test + CV

```r
library(dplyr); library(caret)

# Hold-out (phân tầng theo nhãn)
training <- createDataPartition(iris$Species, p = 0.7, list = FALSE)
training_set <- slice(iris, training)
test_set     <- slice(iris, -training)

# Chia x/y
x_train <- training_set[-5]
x_test  <- test_set[-5]
y_train <- training_set$Species
y_test  <- test_set$Species

# trainControl
ctrl  <- trainControl(method = "cv", number = 5)
ctrl1 <- trainControl(method = "repeatedcv", number = 5, repeats = 3)

# Chuẩn hóa z-score
iris[, -5] <- scale(iris[, -5])

# Hoặc qua preProcess (caret)
credit1 <- preProcess(credit[1:7], method = c("center", "scale"))
credit_final <- predict(credit1, credit)
```

## 12.3. KNN

### Cách 1 – `class::knn`

```r
library(class)
model_knn <- knn(train = x_train,
                 test  = x_test,
                 cl    = y_train,
                 k     = 5)
model_knn
```

### Cách 2 – `caret::train`

```r
# Hold-out (bootstrap mặc định khi không có trControl)
best_knn <- train(Species ~ ., training_set,
  method   = "knn",
  tuneGrid = expand.grid(k = 1:10))
best_knn
plot(best_knn)

# k-fold CV
best_knn <- train(Species ~ ., training_set,
  method    = "knn",
  trControl = ctrl,
  tuneGrid  = expand.grid(k = 3:10))
best_knn
best_knn$bestTune
plot(best_knn)

# Dữ liệu định lượng (Boston / medv) – repeated CV
best_knn <- train(medv ~ ., training_set,
  preProcess = c("center", "scale"),
  method     = "knn",
  trControl  = trainControl(method = "repeatedcv", number = 5, repeats = 3),
  tuneGrid   = expand.grid(k = 3:15))

# Hoặc thay tuneGrid bằng tuneLength
best_knn <- train(Class ~ . - Telephone - ForeignWorker, training_set,
  method     = "knn",
  trControl  = trainControl(method = "repeatedcv", number = 5, repeats = 3),
  na.action  = na.omit,
  tuneLength = 10)
```

### Dự đoán + đánh giá

```r
# Cách 1: knn() trực tiếp
model_knn <- knn(train = x_train, test = x_test,
                 cl = y_train, k = best_knn$bestTune)

# Cách 2: predict()
pred <- predict(best_knn, test_set)
pred

# Phân loại
mean(pred == test_set$Species)
confusionMatrix(table(test_set$Species, pred))

# Hồi quy (Boston)
y_test <- test_set$medv
mse  <- mean((y_test - pred)^2)
mae  <- caret::MAE(y_test, pred)
rmse <- caret::RMSE(y_test, pred)
cat("MSE: ", mse, "MAE: ", mae, " RMSE: ", rmse)

plot(y_test, col = "red", type = "l")
lines(pred, col = "blue")
legend("topright",
       legend = c("original-medv", "predicted"),
       fill = c("red", "blue"), cex = 0.7)
```

## 12.4. Cây quyết định

### Cách 1 – caret

```r
library(rpart); library(rpart.plot); library(caret); library(class)
training <- createDataPartition(iris$Species, p = 0.7, list = FALSE)
training_set <- slice(iris, training)
test_set     <- slice(iris, -training)

ctrl <- trainControl(method = "cv", number = 5)

caret_dt <- train(Species ~ ., training_set,
  method    = "rpart",
  trControl = ctrl,
  tuneLength = 10)
caret_dt
rpart.plot(caret_dt$finalModel)
```

### Cách 2 – rpart trực tiếp

```r
dt <- rpart(Species ~ .,
            training_set,
            method  = "class",                  # "anova" nếu y là số
            control = rpart.control(cp = 0))
dt
printcp(dt)
plotcp(dt)
rpart.plot(dt, type = 5, extra = 104, under = TRUE, cex = 1.7)
# hoặc: rpart.plot(dt, type = 2, extra = 101, under = TRUE, cex = 0.8)

# Dự đoán
x_test <- test_set[-5]
pred <- predict(dt, x_test, type = "class")
confusionMatrix(pred, test_set$Species)
```

### Biến mục tiêu định lượng (anova)

```r
library(MASS)
data("Boston")
training_set <- slice(Boston, 1:400)
test_set     <- slice(Boston, 401:506)

dt <- rpart(medv ~ crim + age + lstat + ptratio,
            training_set,
            method = "anova")
dt
printcp(dt)
plotcp(dt)
rpart.plot(dt, type = 5, extra = 100, under = TRUE, cex = 0.8)

# Cây đầy đủ (cp = 0)
dt <- rpart(medv ~ crim + age + lstat + ptratio,
            training_set,
            method  = "anova",
            control = rpart.control(cp = 0))
rpart.plot(dt, type = 5, extra = 100, under = TRUE, cex = 0.7)

# Tiêu chuẩn dừng
dt <- rpart(medv ~ crim + age + lstat + ptratio,
            training_set,
            method  = "anova",
            control = rpart.control(minsplit = 10,
                                    minbucket = 3,
                                    maxdepth  = 5))
rpart.plot(dt, type = 5, extra = 100, under = TRUE, cex = 0.7)
```

### C5.0

```r
library(C50)
data(iris)
training <- createDataPartition(iris$Species, p = 0.7, list = FALSE)
training_set <- slice(iris, training)
test_set     <- slice(iris, -training)

model <- C5.0(Species ~ ., training_set)
plot(model)
```

---

# PHẦN 13: BÀI TẬP MẪU CÓ LỜI GIẢI

## 📝 Bài 1 — Nhập dữ liệu & iris (Tuần 2 Seminar)

```r
# (a) Tạo dataframe product
product <- data.frame(
  ProdID = c("P01", "P02", "P03", "P04"),
  Category = c("Electronics", "Fashion", "Electronics", "Food"),
  Price_Level = c("High", "Medium", "Low", "Medium"))
product
library(writexl)
write_xlsx(product, "bai1.xlsx")

# (b) iris – đổi tên & thống kê
library(dplyr)
data("iris")
str(iris)
head(iris, 10); tail(iris, 10)

bai2 <- iris %>%
  select(Sepal.Length, Species) %>%
  rename(chieu_dai_canh = Sepal.Length,
         loai_hoa = Species)
summary(bai2$chieu_dai_canh)
write_xlsx(bai2, "bai2.xlsx")
```

## 📝 Bài 2 — air-quality (Bài 4 Seminar)

```r
library(dplyr); library(writexl)
air <- read.csv("air-quality.csv")

# 1) Chọn cột
bai5 <- select(air, year, month, aqi, aqi_categ)

# 2) Cấu trúc + NA
str(bai5)
colSums(is.na(bai5))

# 3) 15 quan sát aqi lớn / nhỏ nhất
slice_max(bai5, aqi, n = 15)
slice_min(bai5, aqi, n = 15)

# 4) TB + trung vị aqi theo year, month
bai5 %>%
  group_by(year, month) %>%
  summarise(aqi_mean = mean(aqi, na.rm = TRUE),
            aqi_med  = median(aqi, na.rm = TRUE))

# 5) Số quan sát mỗi năm
bai5 %>% group_by(year) %>% summarise(n = n())

# 6) Thống kê aqi + bảng tần số aqi_categ
summary(bai5$aqi)
table(bai5$aqi_categ)

# 7) Biến quarter + lưu Excel
bai5 <- bai5 %>% mutate(quarter = case_when(
  month <= 3 ~ 1, month <= 6 ~ 2,
  month <= 9 ~ 3, TRUE ~ 4
), .after = year)
write_xlsx(bai5, "bai4.xlsx")

# 8) Q4/2016
q4_2016 <- filter(bai5, quarter == 4, year == 2016)
nrow(q4_2016)
table(q4_2016$aqi_categ)

# 9) Tháng Q4/2016 nhiều Unhealthy nhất
q4_2016 %>%
  filter(aqi_categ == "Unhealthy") %>%
  group_by(month) %>%
  summarise(count = n()) %>%
  arrange(desc(count))
```

## 📝 Bài 3 — gapminder (Bài 4)

```r
library(gapminder); library(dplyr)

# 1) TB tuổi thọ & dân số theo châu lục
cau1 <- gapminder %>%
  group_by(continent) %>%
  summarise(mean_lifeExp = mean(lifeExp),
            mean_pop = mean(pop))

# 2) Việt Nam + GDP
vn <- gapminder %>%
  filter(country == "Vietnam") %>%
  select(lifeExp, pop, gdpPercap, year) %>%
  mutate(GDP = pop * gdpPercap)

# 3) Năm 2007 – top/bottom 10% GDP
g2007 <- gapminder %>%
  filter(year == 2007) %>%
  mutate(pct = percent_rank(gdpPercap))
g2007 %>% filter(pct >= 0.9) %>%
  select(country, continent, gdpPercap, pct)
g2007 %>% filter(pct <= 0.1) %>%
  select(country, continent, gdpPercap, pct)
```

## 📝 Bài 4 — JOIN (Bài 6)

```r
library(dplyr)
data("band_instruments"); data("band_instruments2"); data("band_members")

inner_join(band_instruments, band_members, by = "name")
left_join(band_instruments,  band_members, by = "name")
right_join(band_instruments, band_members, by = "name")
full_join(band_instruments,  band_members, by = "name")

# Đổi tên + thêm dòng
band <- band_instruments %>%
  rename(artist = name) %>%
  bind_rows(data.frame(artist = "Tom", plays = "bass"))

# Set ops
intersect(band, band_instruments2)
union(band, band_instruments2)
setdiff(band, band_instruments2)

bind_rows(band, band_instruments2)
bind_cols(band, band_instruments2)
```

## 📝 Bài 5 — billboard tidyr (Bài 6)

```r
library(tidyr); library(dplyr)
data("billboard")

# 2) Rename + filter
bb <- billboard %>% rename("1" = wk1)
bb %>% filter(`1` > 50) %>% nrow()

# 3-5) gather + drop_na + sort + gsub
bb_long <- billboard %>%
  gather(week, rank, wk1:wk76) %>%
  drop_na(rank) %>%
  arrange(rank)
bb_long$week <- gsub("wk", "", bb_long$week)

# 6) separate
bb_long <- separate(bb_long, date.entered,
  into = c("year", "month", "day"), sep = "-")

# 7) quarter
bb_long <- bb_long %>%
  mutate(month = as.numeric(month)) %>%
  mutate(quarter = case_when(
    month <= 3 ~ 1, month <= 6 ~ 2,
    month <= 9 ~ 3, TRUE ~ 4))

# 8-9) Thứ hạng TB theo bài hát
bb_long %>%
  group_by(artist, track) %>%
  summarise(avg_rank = mean(rank)) %>%
  arrange(avg_rank)
```

## 📝 Bài 6 — diamonds (Bài 7)

```r
library(ggplot2); library(dplyr); library(tables); library(writexl)
data("diamonds")

# Bảng tần số cut
sort(table(diamonds$cut), decreasing = TRUE)
# tabular (cut đã là factor)
tabular(cut ~ 1 + Percent(), data = diamonds)

# Bảng chéo cut x color + tổng
addmargins(table(diamonds$cut, diamonds$color))

# Xóa 53000 dòng đầu
dia2 <- diamonds %>% slice(-(1:53000))
table(dia2$cut, dia2$table)

# Đồ thị cột cut
ggplot(diamonds, aes(x = cut)) +
  geom_bar(fill = "steelblue") +
  labs(title = "Tần số chất lượng cắt", x = "Cut", y = "Count") +
  theme_minimal()
```

## 📝 Bài 7 — midwest (Bài 7)

```r
library(ggplot2); library(dplyr); library(tables)

# 1-4) filter + select
c1 <- filter(midwest, state == "IN")
c2 <- filter(midwest, state == "OH",
             popwhite >= 40000 & popwhite <= 85000)
c3 <- midwest %>%
  filter(state == "OH") %>%
  select(state, county, poptotal, popamerindian, percamerindian) %>%
  arrange(desc(popamerindian))
c4 <- midwest %>%
  filter(state == "MI",
         poppovertyknown > 10000,
         percprof > 12) %>%
  select(state, county, poppovertyknown, percprof)

# 5) TB nghèo theo bang
midwest %>% group_by(state) %>%
  summarise(m = mean(poppovertyknown)) %>%
  arrange(desc(m))

# 6) sample 10% + bind
c6 <- sample_frac(midwest, 0.1)
combine <- bind_rows(c6, midwest)

# 7) distinct
c72 <- distinct(combine)

# 8) Đổi tên PID
c82 <- rename(combine, `2` = PID)
c82 <- rename(c82, PID = `2`)

# 9-10) bảng + chart state
table(midwest$state)
tabular(state ~ 1 + Percent(), data = midwest)
ggplot(midwest, aes(x = state)) + geom_bar()

# 11-12) scatter + boxplot
ggplot(midwest, aes(x = poptotal, y = popdensity)) +
  geom_point(alpha = 0.5)
ggplot(midwest, aes(x = state, y = percelderlypoverty)) +
  geom_boxplot(fill = "lightblue")

# 13-14) NA + count theo bang
anyNA(midwest); colSums(is.na(midwest))
midwest %>% group_by(state) %>% summarise(n = n())

# 15) level_poverty
midwest %>% mutate(level_poverty = case_when(
  percbelowpoverty < 15 ~ "low",
  percbelowpoverty <= 50 ~ "medium",
  TRUE ~ "high")) %>%
  select(county, state, percamerindian, level_poverty) %>%
  group_by(level_poverty) %>% summarise(n = n())

# 16) TB popasian theo bang
midwest %>% group_by(state) %>%
  summarise(m = mean(popasian, na.rm = TRUE),
            med = median(popasian, na.rm = TRUE))
```

## 📝 Bài 8 — airquality + mtcars (Bài 9 Seminar – Tiền xử lý)

```r
library(dplyr); library(tidyr); library(visdat); library(VIM); library(naniar); library(mice)
data("airquality")

# 1) Mô tả
str(airquality); summary(airquality)

# 2) Kiểm tra NA
anyNA(airquality)
sum(is.na(airquality))
colSums(is.na(airquality))
rowSums(is.na(airquality))
table(is.na(airquality))

# 3) Đồ thị NA
vis_dat(airquality)
vis_miss(airquality)
aggr(airquality, numbers = TRUE, prop = TRUE, sortVars = TRUE, sortCombs = TRUE)
matrixplot(airquality)

# 4) Kiểm định MCAR
mcar_test(airquality)                   # H0: MCAR

# 5a) Xóa dòng có NA
na.omit(airquality)
drop_na(airquality)

# 5b) Xóa cột có NA
airquality[colSums(is.na(airquality)) == 0]

# 5c) Ozone NA ← 0
mutate(airquality, Ozone = case_when(
  is.na(Ozone) ~ 0, TRUE ~ as.numeric(Ozone)))

# 5d) Ozone NA ← median
mutate(airquality, Ozone = case_when(
  is.na(Ozone) ~ median(Ozone, na.rm = TRUE),
  TRUE ~ as.numeric(Ozone)))

# 5e) Thay NA bằng mean (mice)
complete(mice(airquality, method = "mean"))

# 5f) Thay NA bằng giá trị ngẫu nhiên
complete(mice(airquality, method = "sample"))
hotdeck(airquality)

# 5g) Hồi quy thường / hồi quy ngẫu nhiên
complete(mice(airquality, method = "norm.predict"))
complete(mice(airquality, method = "norm.nob"))

# 6) TB theo tháng
airquality %>%
  group_by(Month) %>%
  summarise(Ozone   = mean(Ozone,   na.rm = TRUE),
            Solar.R = mean(Solar.R, na.rm = TRUE),
            Wind    = mean(Wind,    na.rm = TRUE),
            Temp    = mean(Temp,    na.rm = TRUE))

# ----- mtcars outlier -----
data("mtcars")
str(mtcars)

# 2) Biến nào có outlier – dùng boxplot
boxplot(mtcars)                         # duyệt trực quan

# 3a) Boxplot biến hp
dtbox <- boxplot(mtcars$hp)
dtbox$out
filter(mtcars, hp %in% dtbox$out)

# 3b) Z-score
LB <- mean(mtcars$hp) - 3 * sd(mtcars$hp)
UB <- mean(mtcars$hp) + 3 * sd(mtcars$hp)
filter(mtcars, hp < LB | hp > UB)

# 3c) Kiểm định
library(outliers)
grubbs.test(mtcars$hp, type = 10)
grubbs.test(mtcars$hp, type = 11)
dixon.test(mtcars$hp[1:20], type = 11)

library(EnvStats)
rosnerTest(mtcars$hp, k = 3, alpha = 0.05)
```

## 📝 Bài 9 — Phân cụm USArrests

```r
library(datasets); library(dplyr); library(ggdendro); library(ape)
library(factoextra); library(cluster); library(fpc)
data("USArrests")

# Phân cụm phân cấp
dat <- USArrests
d  <- dist(dat)
hc <- hclust(d)
plot(hc); ggdendrogram(hc); ggdendrogram(hc, rotate = TRUE)

clus3 <- cutree(hc, 3)
colors <- c("red", "blue", "green", "yellow")
plot(as.phylo(hc), tip.color = colors[clus3], label.offset = 1, cex = 0.7)
plot(as.phylo(hc), tip.color = colors[clus3], label.offset = 1, cex = 0.7, type = "fan")

USArrests_cl <- bind_cols(as.data.frame(clus3), USArrests)
USArrests_cl %>% group_by(clus3) %>%
  summarise(mean(Murder), mean(Assault), mean(UrbanPop), mean(Rape))

# K-means
df <- scale(USArrests)
fviz_nbclust(df, kmeans, method = "wss") + labs(subtitle = "Elbow method")
fviz_nbclust(df, kmeans, method = "silhouette") + labs(subtitle = "Silhouette")
fviz_nbclust(df, kmeans, nstart = 25, method = "gap_stat", nboot = 50)

km <- kmeans(df, 3, nstart = 25)
km$centers; km$withinss; km$tot.withinss; km$iter
fviz_cluster(km, df)
fviz_cluster(km, df, ellipse.type = "norm")

sl <- silhouette(km$cluster, dist(df))
fviz_silhouette(sl)

# PAM
Arrest <- na.omit(USArrests); Arrest <- scale(Arrest)
pam3 <- pam(Arrest, 3, metric = "euclidean", stand = FALSE)
print(pam3); pam3$medoids; head(pam3$clustering)
pam4 <- pam(Arrest, 4, metric = "euclidean", stand = FALSE)
print(pam4); pam4$medoids

# CLARA
clarax <- clara(USArrests[1:4], 3)
print(clarax)
plot(USArrests, col = clarax$cluster)
```

## 📝 Bài 10 — Luật kết hợp `benh_nhan_data`

```r
library(arules)
trans <- read.transactions("benh_nhan_data.csv",
  format = "basket", sep = ",", rm.duplicates = FALSE)
summary(trans)

rules <- apriori(trans, control = list(verbose = FALSE),
  parameter = list(minlen = 1, support = 0.1, conf = 0.3))
inspect(sort(rules, by = "lift"))

redundant <- is.redundant(rules, measure = "confidence")
rule1 <- rules[!redundant]
inspect(rule1)

# RHS = COVID-19
rules2 <- apriori(trans, control = list(verbose = FALSE),
  parameter  = list(minlen = 1, support = 0.1, conf = 0.3),
  appearance = list(rhs = c("COVID-19"), default = "lhs"))
inspect(sort(rules2, by = "lift"))

# Eclat
rules <- eclat(trans, parameter = list(supp = 0.1, maxlen = 5))
inspect(sort(rules, by = "support"))
```

## 📝 Bài 11 — Mẫu tuần tự `medical_seq`

```r
library(arules); library(arulesSequences); library(dplyr)

patient_seqs <- read_baskets("medical_seq.txt",
  info = c("sequenceID", "eventID", "size"))

s1 <- cspade(patient_seqs,
  parameter = list(support = 0.1, maxsize = 1, maxlen = 4),
  control   = list(verbose = TRUE))

s1_df <- as(s1, "data.frame")
s1_df <- s1_df[order(-s1_df$support), ]
print("Các chuỗi tuần tự y tế tìm thấy:")
head(s1_df, 50)
```

## 📝 Bài 12 — Phân loại KNN (Bài 13)

### Bài 12a – GermanCredit (phân loại)

```r
library(dplyr); library(caret)
data("GermanCredit")

# 1-3) Subset 300 × 10
credit <- GermanCredit %>%
  slice(1:300) %>%
  select(1:10)
str(credit)

# 4) Tiền xử lý
anyNA(credit)                                   # NA
boxplot(credit)                                 # đột xuất
credit1      <- preProcess(credit[1:7], method = c("center", "scale"))
credit_final <- predict(credit1, credit)        # z-score

# 5) Chia 80:20
training <- createDataPartition(credit_final$Class, p = 0.8, list = FALSE)
training_set <- slice(credit_final, training)
test_set     <- slice(credit_final, -training)

# 6) KNN – CV lặp lại 3 lần
ctrl1 <- trainControl(method = "repeatedcv", number = 5, repeats = 3)
best_knn <- train(Class ~ . - Telephone - ForeignWorker, training_set,
                  method     = "knn",
                  trControl  = ctrl1,
                  na.action  = na.omit,
                  tuneLength = 10)
best_knn
plot(best_knn)
best_knn$bestTune

# 7) Dự đoán
pred <- predict(best_knn, test_set)

# 8) Đánh giá
mean(pred == test_set$Class)
confusionMatrix(table(test_set$Class, pred))
# H0: Accuracy ≤ NIR ; H1: Accuracy > NIR (xem p-value)

# Cách 2: bootstrap (mặc định khi không truyền trControl)
best_knn <- train(Class ~ . - Telephone - ForeignWorker, training_set,
                  method     = "knn",
                  na.action  = na.omit,
                  tuneLength = 10)
```

### Bài 12b – Boston (hồi quy)

```r
library(MASS); library(caret); library(dplyr)
data("Boston")
anyNA(Boston)

training <- createDataPartition(Boston$medv, p = 0.7, list = FALSE)
training_set <- slice(Boston, training)
test_set     <- slice(Boston, -training)

best_knn <- train(medv ~ ., training_set,
                  method     = "knn",
                  preProcess = c("center", "scale"),
                  na.action  = na.omit,
                  tuneLength = 10)
best_knn
best_knn$bestTune

pred <- predict(best_knn, test_set)
mse  <- mean((test_set$medv - pred)^2)
mae  <- caret::MAE(test_set$medv, pred)
rmse <- caret::RMSE(test_set$medv, pred)
cat("MSE:", mse, " MAE:", mae, " RMSE:", rmse)

plot(test_set$medv, col = "red", type = "l")
lines(pred, col = "blue")
legend("topright",
       legend = c("original-medv", "predicted"),
       fill = c("red", "blue"), cex = 0.7)
```

## 📝 Bài 13 — Cây quyết định iris

```r
library(caret); library(dplyr); library(rpart); library(rpart.plot)
data("iris")
anyNA(iris)

# Chia 70:30
training <- createDataPartition(iris$Species, p = 0.7, list = FALSE)
training_set <- slice(iris, training)
test_set     <- slice(iris, -training)

# Cách 1 – rpart trực tiếp (cây đầy đủ cp = 0)
DT <- rpart(Species ~ ., training_set, method = "class", cp = 0)
DT
print(DT); summary(DT)
plotcp(DT)
rpart.plot(DT, type = 2, extra = 101, under = TRUE, cex = 0.8)

pred <- predict(DT, test_set, type = "class")
confusionMatrix(table(test_set$Species, pred))

# Cách 2 – caret
DT2 <- train(Species ~ ., data = training_set,
             method     = "rpart",
             trControl  = trainControl(method = "cv", number = 10),
             tuneLength = 10,
             preProcess = c("center", "scale"),
             na.action  = na.pass)
DT2
rpart.plot(DT2$finalModel)
```

---

# PHẦN 14: CHECKLIST ÔN TẬP

## ✅ Kỹ năng R cần thành thạo

### Tuần 1–3 (nền tảng)
- [ ] Nhập dữ liệu (`data.frame`, `c()`, `read_excel`, `read.csv`, `read_sav`, `data()`, `load()`)
- [ ] Xem/sửa/lưu (`View`, `str`, `dim`, `head`, `tail`, `summary`, `edit`, `save`, `write_xlsx`, `write_sav`, `write_dta`)
- [ ] `select`, `filter`, `distinct`, `slice(_max/_min)`, `sample_n/frac`, `top_n/frac`, `bottom_n/frac`
- [ ] `arrange` + `desc`
- [ ] `mutate`, `transmute`, `case_when`
- [ ] `summarise`, `group_by`, `across`, `everything`
- [ ] JOIN: `inner_`, `left_`, `right_`, `full_`, `semi_`, `anti_`
- [ ] Set ops: `intersect`, `union`, `setdiff`; `bind_rows`, `bind_cols`
- [ ] tidyr: `gather`, `spread`, `unite`, `separate`, `gsub`, `drop_na`

### Tuần 3 (Bảng & Đồ thị)
- [ ] `table`, `addmargins`, `prop.table`
- [ ] `tabular` (package `tables`)
- [ ] `cor`, `rcorr`
- [ ] Base: `hist`, `boxplot`, `plot`, `barplot`, `pie`, `dotchart`, `abline(lm(...))`
- [ ] `ggplot` + `aes` + `geom_*` + `labs` + `theme_*`
- [ ] `ggcorrplot`, `ggplotly`, `transition_*` + `shadow_*`

### Tuần 7 (Tiền xử lý)
- [ ] MCAR / MAR / MNAR
- [ ] Phát hiện NA: `anyNA`, `is.na`, `colSums`, `rowSums`, `table(is.na())`
- [ ] Đồ thị NA: `vis_dat`, `vis_miss`, `aggr`, `matrixplot`, `marginplot`
- [ ] `mcar_test` (naniar)
- [ ] Xử lý NA: `na.omit`, `drop_na`, `mutate + case_when`, `mice` (mean/sample/norm.predict/norm.nob/cart/rf), `hotdeck`, `lm + predict`
- [ ] Outlier: Z-score, Hampel, `boxplot()$out`, `hist`, `grubbs.test`, `dixon.test`, `rosnerTest`

### Tuần 9 (Phân cụm + Luật kết hợp + Mẫu tuần tự)
- [ ] `dist`, `hclust`, `cutree`, `ggdendrogram`, `as.phylo`
- [ ] `scale`, `fviz_nbclust` (wss/silhouette/gap_stat), `kmeans`, `fviz_cluster`, `eclust`, `fviz_dend`, `silhouette`, `fviz_silhouette`
- [ ] `pam`, `clara`, `kmodes`
- [ ] `read.transactions`, `apriori`, `inspect`, `sort`, `is.redundant`, `appearance=list(rhs=...)`
- [ ] `rCBA::fpgrowth`, `eclat`
- [ ] `read_baskets`, `cspade`

### Tuần 13 (Phân loại)
- [ ] `createDataPartition`, `slice`, `trainControl` (cv/repeatedcv), `preProcess`
- [ ] KNN: `class::knn` + `caret::train(method="knn")` + `tuneGrid`/`tuneLength`
- [ ] Decision Tree: `rpart` + `rpart.control`, `printcp`, `plotcp`, `rpart.plot`
- [ ] C5.0
- [ ] `predict`, `confusionMatrix`, `caret::MAE`, `caret::RMSE`
- [ ] Hiểu các chỉ số: Accuracy, Sensitivity, Specificity, Kappa, F1, MSE/MAE/RMSE

## ✅ Lý thuyết cần nhớ

- [ ] KDD: 4 bước quy trình
- [ ] Phân loại kỹ thuật: Mô tả vs Dự đoán
- [ ] Có giám sát vs Không giám sát
- [ ] 3 cơ chế missing (MCAR/MAR/MNAR)
- [ ] So sánh nhiễu vs đột xuất
- [ ] Đo khoảng cách: Euclid, Manhattan, Minkowski, Pearson, Chebychev, Cosine
- [ ] Phân cụm: AGNES/DIANA, K-means, PAM, CLARA, K-modes
- [ ] Linkage: centroid, single, average, complete, radius, diameter
- [ ] Chọn k: Elbow, Silhouette, Gap-statistic
- [ ] Luật kết hợp: Support, Confidence, Lift + 3 thuật toán (Apriori, FP-Growth, IT-tree/Eclat)
- [ ] Mẫu tuần tự: length vs size, GSP, SPADE
- [ ] Phân loại: KNN, Decision Tree (CART/ID3/C4.5/C5.0), Random Forest, SVM
- [ ] Gini vs Entropy vs GainRatio
- [ ] Pre-pruning vs Post-pruning
- [ ] Hold-out vs k-fold CV
- [ ] Confusion matrix: TP, TN, FP, FN

---

> 💡 **Mẹo**: Chạy lại TẤT CẢ code trong file này. Thay đổi tham số và dataset để hiểu sâu. Tập trung Bài mẫu 2, 5, 7, 8, 12, 13 vì là các dạng tổng hợp thường gặp.
