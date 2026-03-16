# 📚 ÔN THI GIỮA KỲ - KHAI PHÁ DỮ LIỆU (Data Mining)

> **Môn học**: Những nguyên lý cơ bản của Khai phá dữ liệu  
> **Giảng viên**: TS Trần Thị Nga – Khoa Thống kê, ĐH KTQD  
> **Phạm vi ôn tập**: Tuần 1–7 (4 buổi lý thuyết + 4 buổi bài tập)

---

## 📋 MỤC LỤC

| Phần | Nội dung | Slide gốc |
|------|----------|------------|
| 1 | R cơ bản & dplyr | Tuần 1 (LT) + Tuần 2 (BT) |
| 2 | dplyr nâng cao (join) + tidyr | Tuần 3 (LT) + Bài 6 (BT) |
| 3 | Bảng & Đồ thị (table, ggplot2) | Tuần 3 (LT) + Bài 7 (BT) |
| 4 | Tổng hợp dplyr + tidyr + ggplot2 | Bài 4 + Bài 7 (BT) |
| 5 | Giới thiệu Khai phá dữ liệu | Tuần 5 (LT) |
| 6 | Tiền xử lý dữ liệu | Tuần 7 (LT) |
| 7 | Tổng hợp các dạng bài thi | Tất cả |

---

# PHẦN 1: R CƠ BẢN & GÓI DPLYR

## 1.1. Kiến thức nền tảng R

### Cấu trúc dữ liệu trong R

| Kiểu | Mô tả | Ví dụ |
|------|--------|-------|
| `vector` | Dãy giá trị cùng kiểu | `c(1, 2, 3)` |
| `data.frame` | Bảng 2 chiều (cột khác kiểu OK) | `data.frame(x=1:3, y=c("a","b","c"))` |
| `matrix` | Ma trận 2 chiều (cùng kiểu) | `matrix(1:6, nrow=2)` |
| `list` | Chứa nhiều kiểu khác nhau | `list(a=1, b="hello")` |

### Kiểu biến

| Kiểu | Hàm kiểm tra | Hàm chuyển đổi |
|------|--------------|----------------|
| Số nguyên | `is.integer()` | `as.numeric()` |
| Số thập phân | `is.numeric()` | `as.numeric()` |
| Ký tự | `is.character()` | `as.character()` |
| Logic | `is.logical()` | `as.logical()` |
| Phân loại | `is.factor()` | `as.factor()` |

### Nhập dữ liệu

```r
# Nhập trực tiếp
dat <- data.frame(
  id = c(1, 2, 3),
  tuoi = c(30, 45, 19),
  chitieu = c(2300, 8300, 4500)
)

# Từ file Excel (package readxl)
library(readxl)
dat <- read_excel("file.xlsx", sheet = 1)

# Từ CSV
dat <- read.csv("file.csv", header = TRUE, sep = ",")

# Từ SPSS (package haven)
library(haven)
dat <- read_spss("file.sav")

# Dữ liệu có sẵn trong R
data("mtcars")
data("iris")
```

### Xem thông tin dữ liệu

```r
View(dat)           # Xem toàn bộ (cửa sổ mới)
str(dat)            # Cấu trúc dữ liệu
dim(dat)            # Số dòng x cột
nrow(dat); ncol(dat)
names(dat)          # Tên các cột
head(dat, 10)       # 10 dòng đầu
tail(dat, 5)        # 5 dòng cuối
summary(dat)        # Thống kê mô tả
summary(dat$biến)   # Thống kê 1 biến
```

### Lưu dữ liệu

```r
save(dat, file = "data.rda")                          # File R
library(writexl)
write_xlsx(dat, "output.xlsx")                        # Excel
library(haven)
write_sav(dat, "output.sav")                          # SPSS
```

---

## 1.2. Gói dplyr – Xử lý 1 bộ dữ liệu

> **Cấu trúc chung**: `verb(data, ...)`  
> **Toán tử pipe**: `%>%` (Ctrl+Shift+M) — nối các lệnh thành chuỗi

### 1.2.1. Đổi tên cột/dòng

```r
# rename (dplyr)
rename(dat, "tên_mới" = "tên_cũ")

# colnames
colnames(dat)[2] <- "tên_mới"
colnames(dat) <- c("col1", "col2", "col3")

# rownames
rownames(dat) <- dat[, 1]
```

### 1.2.2. Lọc dữ liệu

```r
# SELECT – chọn cột
select(dat, col1, col2)         # chọn cột
select(dat, col1:col3)          # cột liên tiếp
select(dat, -col1)              # bỏ cột
select(dat, !col1)              # tương tự

# FILTER – lọc dòng theo điều kiện
filter(dat, tuoi > 30)
filter(dat, tuoi > 30 & chitieu < 5000)
filter(dat, tuoi > 30 | chitieu > 8000)

# DISTINCT – xóa trùng lặp
distinct(dat)                   # toàn bộ
distinct(dat, col1, .keep_all = TRUE)  # theo 1 cột, giữ cột khác

# SAMPLE – lấy mẫu ngẫu nhiên
sample_n(dat, 5)                        # lấy 5 quan sát
sample_frac(dat, 0.3)                   # lấy 30%
sample_n(dat, 5, replace = TRUE)        # chọn hoàn lại

# SLICE – chọn theo vị trí
slice(dat, 1:10)                        # 10 dòng đầu
slice(dat, -c(1:5))                     # bỏ 5 dòng đầu
slice_max(dat, col1, n = 5)             # 5 giá trị lớn nhất
slice_min(dat, col1, n = 5)             # 5 giá trị nhỏ nhất

# TOP_N
top_n(dat, 10, col1)                    # 10 lớn nhất theo col1
```

### 1.2.3. Sắp xếp

```r
arrange(dat, col1)              # tăng dần
arrange(dat, desc(col1))        # giảm dần
arrange(dat, col1, desc(col2))  # tăng theo col1, giảm theo col2
```

### 1.2.4. Tạo biến mới (mutate)

```r
# Tạo biến đơn giản
mutate(dat, bmi = weight / height^2)

# Nhiều biến
mutate(dat,
  total = col1 + col2,
  avg = total / 2
)

# Với điều kiện (case_when)
mutate(dat, level = case_when(
  score < 5  ~ "Low",
  score < 8  ~ "Medium",
  TRUE       ~ "High"
))

# Tùy chọn
mutate(dat, new_col = col1*2, .keep = "all")    # giữ tất cả cột
mutate(dat, new_col = col1*2, .keep = "used")   # chỉ giữ cột tham gia
mutate(dat, new_col = col1*2, .before = 2)      # đặt cột mới ở vị trí 2
```

### 1.2.5. Tổng hợp (summarise)

```r
# Tính 1 hàm
summarise(dat, mean_x = mean(col1, na.rm = TRUE))

# Nhiều hàm
summarise(dat,
  tb = mean(col1, na.rm = TRUE),
  tv = median(col1, na.rm = TRUE),
  sd = sd(col1, na.rm = TRUE),
  n  = n()
)

# Theo nhóm (group_by + summarise)
dat %>%
  group_by(nhom) %>%
  summarise(
    tb = mean(col1, na.rm = TRUE),
    tv = median(col1, na.rm = TRUE)
  )

# Nhiều cột cùng lúc
summarise(dat, across(c(col1, col2), list(mean)))
summarise(dat, across(everything(), list(mean)))
```

### Các hàm thống kê phổ biến

| Hàm | Mô tả |
|-----|--------|
| `mean()` | Trung bình |
| `median()` | Trung vị |
| `sd()` | Độ lệch chuẩn |
| `var()` | Phương sai |
| `min()`, `max()` | Giá trị nhỏ/lớn nhất |
| `n()` | Số quan sát |
| `first()`, `last()` | Giá trị đầu/cuối |
| `sum()` | Tổng |

> ⚠️ Nếu dữ liệu có NA, thêm `na.rm = TRUE` vào trong hàm!

---

## 1.3. Gói dplyr – Xử lý 2 bộ dữ liệu (JOIN)

### Ghép theo cột (JOIN – cần biến chung "key")

```r
# inner_join: chỉ giữ quan sát chung
inner_join(dat1, dat2, by = "key")

# left_join: giữ tất cả quan sát từ dat1
left_join(dat1, dat2, by = "key")

# right_join: giữ tất cả quan sát từ dat2
right_join(dat1, dat2, by = "key")

# full_join: giữ tất cả từ cả hai
full_join(dat1, dat2, by = "key")
```

### Ghép theo dòng (SET operations – cùng cấu trúc cột)

```r
intersect(dat1, dat2)   # dòng chung
union(dat1, dat2)       # tất cả dòng (bỏ trùng)
setdiff(dat1, dat2)     # dòng có trong dat1, không có dat2
```

### Nối đơn giản (không kiểm tra điều kiện)

```r
bind_rows(dat1, dat2)   # nối dòng
bind_cols(dat1, dat2)   # nối cột (phải cùng số dòng)
```

---

# PHẦN 2: GÓI TIDYR – CHỈNH HÌNH DỮ LIỆU

## 2.1. Các lệnh cơ bản

```r
library(tidyr)

# GATHER – chuyển cột thành dòng (wide → long)
gather(dat, tên_cột_key, tên_cột_value, cột1, cột2, ...)
# VD: gather(diemthi, mon, diem, van, ngoaingu, toan)

# SPREAD – chuyển dòng thành cột (long → wide)
spread(dat, cột_key, cột_value)

# UNITE – gộp nhiều cột thành 1
unite(dat, col = "tên_mới", col1, col2, sep = "_", remove = TRUE)

# SEPARATE – tách 1 cột thành nhiều cột
separate(dat, col, into = c("col1", "col2"), sep = "-", remove = TRUE)

# GSUB – thay thế ký tự
gsub("old", "new", dat$col)
# VD: dat$week <- gsub("wk", "", dat$week)  # xóa "wk"
```

---

# PHẦN 3: BẢNG & ĐỒ THỊ

## 3.1. Lập bảng

### Lệnh table (cơ bản)

```r
# Bảng tần số 1 chiều
table(dat$col)

# Bảng 2 chiều
tab <- table(dat$col1, dat$col2)

# Thêm tổng
addmargins(tab)

# Bảng tần suất
prop.table(tab)           # tỷ lệ chung
prop.table(tab, 1)        # tỷ lệ theo dòng
prop.table(tab, 2)        # tỷ lệ theo cột
round(100 * prop.table(tab), 2)  # phần trăm, 2 chữ số
```

### Lệnh tabular (package tables)

```r
library(tables)
# Cấu trúc: tabular(dòng ~ cột)
tabular(col1 ~ 1)                        # tần số
tabular(col1 ~ Percent())                # tần suất
tabular(col1 ~ 1 + Percent())            # cả hai
tabular(col1 * col2 ~ 1)                 # phân tổ kết hợp
tabular(col1 + 1 ~ col2 + 1)             # có tổng

# Lưu bảng
write.csv.tabular(bang, file = "output.csv")
```

### Phân tích tương quan

```r
cor(dat, method = "pearson")  # hoặc "kendall", "spearman"

library(Hmisc)
a <- rcorr(as.matrix(dat))
a$r   # Hệ số tương quan
a$P   # P-value
a$n   # Số quan sát
```

## 3.2. Vẽ đồ thị

### Lệnh plot (cơ bản)

```r
plot(dat$x, dat$y, type = "p", main = "Title", xlab = "X", ylab = "Y")
hist(dat$x)
boxplot(dat$x)
barplot(table(dat$x))
pie(table(dat$x))
```

### Package ggplot2

```r
library(ggplot2)

# Cấu trúc cơ bản
ggplot(data, aes(x = col_x, y = col_y)) +
  geom_loại() +          # biểu đồ
  labs() +                # nhãn
  theme_minimal()         # hình nền

# Biểu đồ cột
ggplot(dat, aes(x = cut)) +
  geom_bar(fill = "steelblue") +
  labs(title = "Tần số chất lượng cắt", x = "Cut", y = "Count")

# Biểu đồ phân tán
ggplot(dat, aes(x = poptotal, y = popdensity)) +
  geom_point(color = "red", alpha = 0.5) +
  labs(title = "Scatter Plot")

# Boxplot theo nhóm
ggplot(dat, aes(x = state, y = percelderlypoverty)) +
  geom_boxplot(fill = "lightblue") +
  labs(title = "Boxplot theo bang")

# Histogram
ggplot(dat, aes(x = price)) +
  geom_histogram(bins = 30, fill = "coral")

# Chia nhỏ đồ thị (facet)
ggplot(dat, aes(x = value)) +
  geom_histogram() +
  facet_wrap(~ group)

# Tương tác (plotly)
library(plotly)
ggplotly(p)  # p là ggplot object
```

### Đồ thị tương quan

```r
library(ggcorrplot)
ggcorrplot(cor(dat),
  method = "circle",
  type = "upper",
  lab = TRUE,
  colors = c("blue", "white", "red"))
```

---

# PHẦN 4: KHAI PHÁ DỮ LIỆU – LÝ THUYẾT (Tuần 5)

## 4.1. Khái niệm

**Khai phá dữ liệu** = Hệ thống các phương pháp áp dụng cho CSDL lớn, phức tạp để loại bỏ yếu tố ngẫu nhiên, khám phá mẫu/mô hình, quy luật tiềm ẩn.

- Là lĩnh vực **liên ngành**: CSDL + Thống kê + Thuật toán + Máy học + Trực quan hóa

## 4.2. Quy trình khai phá dữ liệu

```
Dữ liệu vào → Tiền xử lý → Khai phá dữ liệu → Đánh giá mô hình → Tri thức
```

## 4.3. Phân loại kỹ thuật KPDL

| Loại | Phương pháp | Học |
|------|-------------|-----|
| **Mô tả** | Phân cụm (Clustering) | Không giám sát |
| | Luật kết hợp (Association Rules) | Không giám sát |
| | Phát hiện bất thường (Anomaly) | Cả hai |
| **Dự đoán** | Phân loại (Classification) | Có giám sát |
| | Hồi quy (Regression) | Có giám sát |
| | Dãy số thời gian | Có giám sát |

## 4.4. Dữ liệu được khai phá

| Dữ liệu có cấu trúc | Dữ liệu phi cấu trúc |
|-----------------------|----------------------|
| Bảng, dòng, cột | Hình ảnh, video, email, văn bản |
| ~20% dữ liệu doanh nghiệp | ~80% dữ liệu doanh nghiệp |
| Dễ lưu trữ, quản lý | Phức tạp hơn |

---

# PHẦN 5: TIỀN XỬ LÝ DỮ LIỆU (Tuần 7)

## 5.1. Tổng quan

4 kỹ thuật tiền xử lý: **Tích hợp** → **Làm sạch** → **Chuyển đổi** → **Rút gọn**

Chất lượng dữ liệu: Kịp thời, Đầy đủ, Chính xác, Nhất quán, Tin cậy, Diễn giải được.

## 5.2. Xử lý dữ liệu khuyết thiếu (Missing Data)

### Cơ chế khuyết thiếu

| Cơ chế | Phân phối | Khả năng dự báo | Xử lý |
|--------|-----------|-----------------|-------|
| **MCAR** (hoàn toàn ngẫu nhiên) | Ngẫu nhiên | Không | Loại bỏ hoặc thay thế |
| **MAR** (ngẫu nhiên) | Phi ngẫu nhiên | Có (từ biến khác) | Thay thế, phương pháp chuyên sâu |
| **MNAR** (không ngẫu nhiên) | Phi ngẫu nhiên | Không | Thu thập thêm dữ liệu |

### Code R – Kiểm tra missing

```r
anyNA(dat)                    # Có NA không?
is.na(dat)                    # Ma trận TRUE/FALSE
sum(is.na(dat))               # Tổng số NA
colSums(is.na(dat))           # Số NA theo cột
rowSums(is.na(dat))           # Số NA theo dòng

# Đồ thị (visdat)
library(visdat)
vis_dat(dat)
vis_miss(dat)

# Đồ thị (VIM)
library(VIM)
aggr(dat, numbers = TRUE, prop = FALSE, sortVars = TRUE)
matrixplot(dat)
marginplot(dat[c("var1", "var2")])

# Kiểm định MCAR (naniar)
library(naniar)
mcar_test(dat)   # H0: MCAR, H1: MAR
```

### Code R – Xử lý missing

```r
# 1. Xóa
na.omit(dat)                              # Xóa dòng có NA
drop_na(dat)                              # Tương tự (tidyr)
drop_na(dat, col1)                        # Xóa NA ở 1 cột
dat[colSums(is.na(dat)) == 0]             # Xóa cột có NA

# 2. Thay thế bằng trung bình/trung vị
dat %>% mutate(col1 = case_when(
  is.na(col1) ~ mean(col1, na.rm = TRUE),
  TRUE ~ col1
))

# Package mice
library(mice)
complete(mice(dat, method = "mean"))       # Trung bình
complete(mice(dat, method = "sample"))     # Ngẫu nhiên (hot-deck)
complete(mice(dat, method = "norm.predict")) # Hồi quy
complete(mice(dat, method = "norm.nob"))   # Hồi quy ngẫu nhiên
complete(mice(dat, method = "cart"))        # Cây quyết định
complete(mice(dat, method = "rf"))          # Rừng ngẫu nhiên

# Package VIM
library(VIM)
hotdeck(dat)                               # Hot-deck

# 3. Hồi quy tự viết
model <- lm(y ~ x, data = dat)
dat %>% mutate(y = case_when(
  is.na(y) ~ predict(model, .),
  TRUE ~ y
))
```

## 5.3. Dữ liệu nhiễu vs Dữ liệu đột xuất (Outlier)

| | Dữ liệu nhiễu (Noise) | Dữ liệu đột xuất (Outlier) |
|-|------------------------|-----------------------------|
| Bản chất | Không phải giá trị thực | Có thể là giá trị thực |
| Ảnh hưởng | Overfit mô hình | Tạo lỗi nhưng không sai lệch |
| Phân phối | Theo phân phối dữ liệu | Không theo phân phối |

### Code R – Xác định Outlier

```r
# Z-score
LB <- mean(dat$x) - 3 * sd(dat$x)
UB <- mean(dat$x) + 3 * sd(dat$x)
filter(dat, x < LB | x > UB)

# Hampel filter
LB <- median(dat$x) - 3 * mad(dat$x)
UB <- median(dat$x) + 3 * mad(dat$x)
filter(dat, x < LB | x > UB)

# Boxplot
bp <- boxplot(dat$x)
bp$out   # Giá trị đột xuất

# Histogram
hist(dat$x)

# Kiểm định (package outliers)
library(outliers)
grubbs.test(dat$x, type = 10)        # Grubbs (1 outlier, 1 phía)
grubbs.test(dat$x, type = 11)        # Grubbs (1 outlier, 2 phía)
dixon.test(dat$x)                     # Dixon (mẫu nhỏ < 25-30)

# Kiểm định Rosner (package EnvStats, mẫu lớn > 20)
library(EnvStats)
rosnerTest(dat$x, k = 3, alpha = 0.05)
```

---

# PHẦN 6: TỔNG HỢP CÁC DẠNG BÀI TẬP & HƯỚNG DẪN GIẢI

## 📝 DẠNG 1: Nhập & Xem dữ liệu (Tuần 2 – Bài 1, 2)

**Đề mẫu**: Nhập bảng dữ liệu vào dataframe, kiểm tra, lưu file.

```r
# Bài 1 (Tuần 2): Nhập data product
product <- data.frame(
  ProdID = c("P01", "P02", "P03", "P04"),
  Category = c("Electronics", "Fashion", "Electronics", "Food"),
  Price_Level = c("High", "Medium", "Low", "Medium")
)
product                 # xem trong console
library(writexl)
write_xlsx(product, "bai1.xlsx")

# Bài 2 (Tuần 2): Dữ liệu iris
data("iris")
str(iris)
head(iris, 10)
tail(iris, 10)
bai2 <- iris %>%
  select(Sepal.Length, Species) %>%
  rename(chieu_dai_canh = Sepal.Length, loai_hoa = Species)
summary(bai2$chieu_dai_canh)
write_xlsx(bai2, "bai2.xlsx")
```

---

## 📝 DẠNG 2: Lọc, sắp xếp, tổng hợp dplyr (Bài 4 – air-quality)

**Đề mẫu**: Đọc air-quality.csv, select, filter, slice_max, group_by + summarise, mutate.

```r
library(dplyr); library(readr); library(writexl)
air <- read.csv("air-quality.csv")

# 1) Tạo dataframe chọn cột
bai5 <- select(air, year, month, aqi, aqi_categ)

# 2) Kiểm tra cấu trúc & NA
str(bai5)
colSums(is.na(bai5))

# 3) 15 quan sát lớn/nhỏ nhất theo aqi
slice_max(bai5, aqi, n = 15)
slice_min(bai5, aqi, n = 15)

# 4) Trung bình, trung vị aqi theo năm & tháng
bai5 %>%
  group_by(year, month) %>%
  summarise(
    aqi_mean = mean(aqi, na.rm = TRUE),
    aqi_med  = median(aqi, na.rm = TRUE)
  )

# 5) Số quan sát mỗi năm
bai5 %>% group_by(year) %>% summarise(n = n())

# 6) Thống kê mô tả aqi + bảng tần số aqi_categ
summary(bai5$aqi)
table(bai5$aqi_categ)

# 7) Tạo biến quarter, tính aqi theo quý
bai5 <- bai5 %>%
  mutate(quarter = case_when(
    month <= 3  ~ 1,
    month <= 6  ~ 2,
    month <= 9  ~ 3,
    TRUE        ~ 4
  ), .after = year)
write_xlsx(bai5, "bai4.xlsx")

quy_stats <- bai5 %>%
  group_by(year, quarter) %>%
  summarise(aqi_mean = mean(aqi, na.rm = TRUE),
            aqi_med  = median(aqi, na.rm = TRUE))

# 8) Quý 4 năm 2016
q4_2016 <- filter(bai5, quarter == 4, year == 2016)
nrow(q4_2016)
table(q4_2016$aqi_categ)

# 9) Tháng nào nhiều Unhealthy nhất
q4_2016 %>%
  filter(aqi_categ == "Unhealthy") %>%
  group_by(month) %>%
  summarise(count = n()) %>%
  arrange(desc(count))
```

---

## 📝 DẠNG 3: Gapminder – group_by, mutate, percent_rank (Bài 4 – Bài 2)

```r
library(gapminder); library(dplyr)
data("gapminder")

# 1) Tuổi thọ & dân số TB theo châu lục
cau1 <- gapminder %>%
  group_by(continent) %>%
  summarise(mean_lifeExp = mean(lifeExp),
            mean_pop = mean(pop))

# 2) Dữ liệu Việt Nam + tính GDP
vn <- gapminder %>%
  filter(country == "Vietnam") %>%
  select(lifeExp, pop, gdpPercap, year) %>%
  mutate(GDP = pop * gdpPercap)

# 3) Phân vị GDP năm 2007
gdp_2007 <- gapminder %>%
  filter(year == 2007) %>%
  mutate(percentile = percent_rank(gdpPercap))
# Top 10% cao nhất
gdp_2007 %>% filter(percentile >= 0.9) %>%
  select(country, continent, gdpPercap, percentile)
# Bottom 10%
gdp_2007 %>% filter(percentile <= 0.1) %>%
  select(country, continent, gdpPercap, percentile)
```

---

## 📝 DẠNG 4: Join 2 bộ dữ liệu (Bài 6)

```r
library(dplyr)
data("band_instruments"); data("band_instruments2"); data("band_members")

# So sánh các loại join
inner_join(band_instruments, band_members, by = "name")
left_join(band_instruments, band_members, by = "name")
right_join(band_instruments, band_members, by = "name")
full_join(band_instruments, band_members, by = "name")

# Thêm dòng + đổi tên
band <- band_instruments %>%
  rename(artist = name) %>%
  bind_rows(data.frame(artist = "Tom", plays = "bass"))

# Set operations (cần cùng cấu trúc cột)
intersect(band, band_instruments2)
union(band, band_instruments2)
setdiff(band, band_instruments2)

# Nối đơn giản
bind_rows(band, band_instruments2)
bind_cols(band, band_instruments2)  # cẩn thận số dòng!
```

---

## 📝 DẠNG 5: tidyr – billboard (Bài 6)

```r
library(tidyr); library(dplyr)
data("billboard")

# 1) Cấu trúc
str(billboard); dim(billboard)

# 2) Đổi tên wk1 -> 1, lọc rank > 50
bb <- billboard %>% rename("1" = wk1)
bb %>% filter(`1` > 50) %>% nrow()

# 3) Gather (wide → long)
bb_long <- billboard %>%
  gather(week, rank, wk1:wk76) %>%
  drop_na(rank)

# 4) Sắp xếp tăng dần theo rank
bb_long <- arrange(bb_long, rank)

# 5) Xóa "wk" trong cột week
bb_long$week <- gsub("wk", "", bb_long$week)

# 6) Tách date.entered thành day, month, year
bb_long <- separate(bb_long, date.entered,
  into = c("year", "month", "day"), sep = "-")

# 7) Tạo biến quarter
bb_long <- bb_long %>%
  mutate(month = as.numeric(month)) %>%
  mutate(quarter = case_when(
    month <= 3  ~ 1,
    month <= 6  ~ 2,
    month <= 9  ~ 3,
    TRUE        ~ 4
  ))

# 8-9) Thứ hạng TB từng bài hát, sắp xếp
bb_long %>%
  group_by(artist, track) %>%
  summarise(avg_rank = mean(rank)) %>%
  arrange(avg_rank)
```

---

## 📝 DẠNG 6: Bảng & Đồ thị – diamonds (Bài 7 – Bài 1)

```r
library(ggplot2); library(dplyr); library(tables); library(writexl)
data("diamonds")

# Bảng tần số cut (table)
tab_cut <- table(diamonds$cut)
tab_cut <- sort(tab_cut, decreasing = TRUE)

# tabular
tabular(cut ~ 1 + Percent(), data = diamonds)

# Bảng chéo cut x color + tổng
tab_cc <- table(diamonds$cut, diamonds$color)
addmargins(tab_cc)

# Xóa 53000 dòng đầu
dia2 <- diamonds %>% slice(-(1:53000))
table(dia2$cut, dia2$table)

# Đồ thị cột tần số cut
ggplot(diamonds, aes(x = cut)) +
  geom_bar(fill = "steelblue") +
  labs(title = "Tần số chất lượng cắt", x = "Cut", y = "Count") +
  theme_minimal()
```

---

## 📝 DẠNG 7: Bài tổng hợp – midwest (Bài 7 – Bài 2)

```r
library(ggplot2); library(dplyr); library(tables)
data("midwest")

# 1) Lọc bang Indiana
c1 <- filter(midwest, state == "IN")

# 2) Lọc Ohio, popwhite 40k-85k
c2 <- filter(midwest, state == "OH",
             popwhite >= 40000 & popwhite <= 85000)

# 3) Chọn cột, sắp xếp
c3 <- midwest %>%
  filter(state == "OH") %>%
  select(state, county, poptotal, popamerindian, percamerindian) %>%
  arrange(desc(popamerindian))
head(c3, 1)  # Hạt nhiều thổ dân nhất

# 4) Lọc MI, poverty > 10k, percprof > 12%
c4 <- midwest %>%
  filter(state == "MI",
         poppovertyknown > 10000,
         percprof > 12) %>%
  select(state, county, poppovertyknown, percprof)

# 5) Dân số nghèo TB theo bang, giảm dần
midwest %>%
  group_by(state) %>%
  summarise(mean_poverty = mean(poppovertyknown)) %>%
  arrange(desc(mean_poverty))

# 6) Chọn 10% mẫu + nối
c6 <- sample_frac(midwest, 0.1, replace = FALSE)
nrow(c6)
combine <- bind_rows(c6, midwest)

# 7) Xóa trùng
c72 <- distinct(combine)

# 8) Đổi tên PID
c82 <- rename(combine, `2` = PID)
c82 <- rename(c82, PID = `2`)

# 9-10) Bảng tần số & tần suất state
table(midwest$state)
tabular(state ~ 1 + Percent(), data = midwest)
ggplot(midwest, aes(x = state)) + geom_bar()

# 11) Scatter plot poptotal vs popdensity
ggplot(midwest, aes(x = poptotal, y = popdensity)) +
  geom_point(alpha = 0.5) +
  labs(title = "Tổng dân vs Mật độ")

# 12) Boxplot percelderlypoverty theo state
ggplot(midwest, aes(x = state, y = percelderlypoverty)) +
  geom_boxplot(fill = "lightblue")

# 13) Kiểm tra NA
anyNA(midwest)
colSums(is.na(midwest))

# 14) Số quan sát mỗi bang
midwest %>% group_by(state) %>% summarise(n = n())

# 15) Tạo biến level_poverty
midwest %>%
  mutate(level_poverty = case_when(
    percbelowpoverty < 15 ~ "low",
    percbelowpoverty <= 50 ~ "medium",
    TRUE ~ "high"
  )) %>%
  select(county, state, percamerindian, level_poverty) %>%
  group_by(level_poverty) %>%
  summarise(n = n())

# 16) TB và TV popasian theo bang
midwest %>%
  group_by(state) %>%
  summarise(
    mean_asian = mean(popasian, na.rm = TRUE),
    med_asian  = median(popasian, na.rm = TRUE)
  )
```

---

# PHẦN 7: CHECKLIST ÔN TẬP NHANH

## ✅ Kỹ năng R cần thành thạo

- [ ] Nhập dữ liệu trực tiếp (`data.frame`, `c()`) & từ file (`read_excel`, `read.csv`)
- [ ] Xem thông tin (`str`, `dim`, `head`, `summary`)
- [ ] Lưu dữ liệu (`write_xlsx`, `save`)
- [ ] `select`, `filter`, `distinct`, `slice`, `sample_n/frac`
- [ ] `arrange` (tăng/giảm dần)
- [ ] `mutate` + `case_when`
- [ ] `summarise` + `group_by` + `across`
- [ ] Tất cả loại JOIN (`inner`, `left`, `right`, `full`)
- [ ] Set operations (`intersect`, `union`, `setdiff`)
- [ ] `bind_rows`, `bind_cols`
- [ ] `gather`, `spread`, `unite`, `separate`, `gsub`
- [ ] `table`, `prop.table`, `addmargins`, `tabular`
- [ ] `ggplot` + `geom_bar/point/boxplot/histogram`
- [ ] Kiểm tra & xử lý NA (`is.na`, `drop_na`, `mice`)
- [ ] Xác định outlier (Z-score, Hampel, boxplot, Grubbs, Dixon, Rosner)

## ✅ Lý thuyết cần nhớ

- [ ] Định nghĩa Khai phá dữ liệu
- [ ] Quy trình KPDL (4 bước)
- [ ] Phân loại: Mô tả vs Dự đoán
- [ ] Phân cụm vs Phân loại vs Luật kết hợp
- [ ] Học có giám sát vs Không giám sát
- [ ] 3 cơ chế missing: MCAR, MAR, MNAR
- [ ] So sánh dữ liệu nhiễu vs đột xuất
- [ ] Các phương pháp điền missing (single vs multiple imputation)
- [ ] Ưu/nhược điểm từng phương pháp xử lý missing

---

> 💡 **Mẹo ôn thi**: Chạy lại TẤT CẢ code trong file này trên RStudio. Thay đổi tham số, thử sai để hiểu sâu hơn. Focus vào các dạng bài 2, 4, 5, 7 vì đó là dạng tổng hợp nhất!
