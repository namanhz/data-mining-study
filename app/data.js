// Content data for the Data Mining Study App
const CHAPTERS = {
  // ============ THEORY CHAPTERS ============
  t1: {
    title: "R Cơ Bản & Cấu Trúc Dữ Liệu",
    icon: "📦",
    badge: "Tuần 1",
    mode: "theory",
    cards: [
      {
        title: "R là gì?",
        icon: "💡",
        html: `<p>Công cụ mã nguồn mở cho <strong>Data Mining, Big Data, Data Visualization, Machine Learning</strong>. Chạy trên Windows/Unix/MacOS.</p>
<h4>Hệ sinh thái R</h4>
<table class="kv-table">
<tr><th>Thành phần</th><th>Mô tả</th></tr>
<tr><td>R</td><td>Ngôn ngữ lập trình cốt lõi</td></tr>
<tr><td>RStudio</td><td>IDE (giao diện lập trình) cho R</td></tr>
<tr><td>R Packages</td><td>Gói mở rộng chức năng (dplyr, ggplot2,...)</td></tr>
<tr><td>R Markdown</td><td>Tạo báo cáo kết hợp code + text</td></tr>
</table>`
      },
      {
        title: "Cấu trúc dữ liệu",
        icon: "🗂️",
        html: `<table class="kv-table">
<tr><th>Kiểu</th><th>Mô tả</th><th>Ví dụ</th></tr>
<tr><td><code>data.frame</code></td><td>Bảng 2 chiều (cột khác kiểu OK)</td><td><code>data.frame(x=1:3, y=c("a","b","c"))</code></td></tr>
<tr><td><code>vector</code></td><td>Dãy giá trị cùng kiểu</td><td><code>c(1, 2, 3)</code></td></tr>
<tr><td><code>matrix</code></td><td>Ma trận (cùng kiểu, 2 chiều)</td><td><code>matrix(1:6, nrow=2)</code></td></tr>
<tr><td><code>list</code></td><td>Chứa nhiều kiểu khác nhau</td><td><code>list(a=1, b="hi")</code></td></tr>
</table>
<h4>Kiểu biến & Chuyển đổi</h4>
<table class="kv-table">
<tr><th>Kiểu</th><th>Chuyển đổi</th></tr>
<tr><td>Số (numeric/integer)</td><td><code>as.numeric(x)</code></td></tr>
<tr><td>Ký tự (character)</td><td><code>as.character(x)</code></td></tr>
<tr><td>Logic (TRUE/FALSE)</td><td><code>as.logical(x)</code></td></tr>
<tr><td>Phân loại (factor)</td><td><code>as.factor(x)</code></td></tr>
</table>`
      },
      {
        title: "Nhập & Xuất dữ liệu",
        icon: "📥",
        html: `<h4>Nhập dữ liệu</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># Trực tiếp
dat &lt;- data.frame(id = c(1,2,3), tuoi = c(30,45,19))

# Từ Excel (package readxl)
library(readxl)
dat &lt;- read_excel("file.xlsx", sheet = 1)

# Từ CSV
dat &lt;- read.csv("file.csv", header = TRUE, sep = ",")

# Từ SPSS (package haven)
library(haven)
dat &lt;- read_spss("file.sav")

# Dữ liệu có sẵn
data("mtcars")
data("iris")</pre></div>

<h4>Xem thông tin</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>View(dat)        # Xem dạng bảng
str(dat)         # Cấu trúc
dim(dat)         # Kích thước (dòng x cột)
nrow(dat); ncol(dat)
names(dat)       # Tên cột
head(dat, 10)    # 10 dòng đầu
tail(dat, 5)     # 5 dòng cuối
summary(dat)     # Thống kê mô tả</pre></div>

<h4>Lưu dữ liệu</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>save(dat, file = "data.rda")           # File R
library(writexl)
write_xlsx(dat, "output.xlsx")         # Excel
library(haven)
write_sav(dat, "output.sav")           # SPSS</pre></div>`
      },
      {
        title: "Toán tử & Ký hiệu quan trọng",
        icon: "⚡",
        html: `<table class="kv-table">
<tr><th>Ký hiệu</th><th>Ý nghĩa</th></tr>
<tr><td><code>&lt;-</code> hoặc <code>=</code></td><td>Gán giá trị</td></tr>
<tr><td><code>%&gt;%</code></td><td>Pipe (nối lệnh) – Ctrl+Shift+M</td></tr>
<tr><td><code>$</code></td><td>Truy cập biến trong data (vd: dat$col)</td></tr>
<tr><td><code>==</code>, <code>!=</code></td><td>Bằng, không bằng</td></tr>
<tr><td><code>&</code>, <code>|</code>, <code>!</code></td><td>AND, OR, NOT</td></tr>
<tr><td><code>%%</code></td><td>Phần dư</td></tr>
<tr><td><code>%/%</code></td><td>Phần nguyên</td></tr>
<tr><td><code>#</code></td><td>Ghi chú (comment)</td></tr>
</table>
<div class="alert alert-warn"><span class="alert-icon">⚠️</span>Package phải được gọi bằng <code>library(tên)</code> trước khi dùng. Cài bằng <code>install.packages("tên")</code>.</div>`
      }
    ]
  },

  t2: {
    title: "dplyr – Xử lý 1 bộ dữ liệu",
    icon: "🔧",
    badge: "Tuần 1",
    mode: "theory",
    cards: [
      {
        title: "select, filter, distinct",
        icon: "🔍",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># SELECT – chọn cột
select(dat, col1, col2)       # chọn cột
select(dat, col1:col3)        # liên tiếp
select(dat, -col1)            # bỏ cột

# FILTER – lọc dòng theo điều kiện
filter(dat, tuoi &gt; 30)
filter(dat, tuoi &gt; 30 &amp; chitieu &lt; 5000)

# DISTINCT – xóa trùng lặp
distinct(dat)
distinct(dat, col1, .keep_all = TRUE)</pre></div>`
      },
      {
        title: "sample, slice, top_n",
        icon: "✂️",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># Lấy mẫu ngẫu nhiên
sample_n(dat, 5)                  # 5 quan sát
sample_frac(dat, 0.3)             # 30%
sample_n(dat, 5, replace = TRUE)  # hoàn lại

# Chọn theo vị trí
slice(dat, 1:10)                  # 10 dòng đầu
slice(dat, -c(1:5))               # bỏ 5 dòng đầu
slice_max(dat, col1, n = 5)       # 5 lớn nhất
slice_min(dat, col1, n = 5)       # 5 nhỏ nhất

# Top N
top_n(dat, 10, col1)              # 10 lớn nhất</pre></div>`
      },
      {
        title: "arrange, mutate, summarise",
        icon: "📊",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># SẮP XẾP
arrange(dat, col1)            # tăng dần
arrange(dat, desc(col1))      # giảm dần
arrange(dat, col1, desc(col2))# nhiều cột

# TẠO BIẾN MỚI
mutate(dat, bmi = weight / height^2)
mutate(dat, total = col1 + col2, avg = total / 2)
mutate(dat, level = case_when(
  score &lt; 5  ~ "Low",
  score &lt; 8  ~ "Medium",
  TRUE       ~ "High"
))
mutate(dat, new_col = col1*2, .keep = "all")
mutate(dat, new_col = col1*2, .before = 2)

# TỔNG HỢP
summarise(dat, tb = mean(x, na.rm=TRUE), n = n())

# THEO NHÓM
dat %&gt;%
  group_by(nhom) %&gt;%
  summarise(tb = mean(x, na.rm=TRUE),
            tv = median(x, na.rm=TRUE))

# NHIỀU CỘT CÙNG LÚC
summarise(dat, across(c(col1, col2), list(mean)))
summarise(dat, across(everything(), list(mean)))</pre></div>
<div class="alert alert-warn"><span class="alert-icon">⚠️</span>Nếu dữ liệu có NA, thêm <code>na.rm = TRUE</code> vào hàm thống kê!</div>
<h4>Các hàm thống kê</h4>
<table class="kv-table">
<tr><th>Hàm</th><th>Ý nghĩa</th></tr>
<tr><td><code>mean()</code></td><td>Trung bình</td></tr>
<tr><td><code>median()</code></td><td>Trung vị</td></tr>
<tr><td><code>sd()</code>, <code>var()</code></td><td>Độ lệch chuẩn, Phương sai</td></tr>
<tr><td><code>min()</code>, <code>max()</code></td><td>Nhỏ nhất, Lớn nhất</td></tr>
<tr><td><code>n()</code></td><td>Số quan sát</td></tr>
<tr><td><code>sum()</code></td><td>Tổng</td></tr>
<tr><td><code>first()</code>, <code>last()</code></td><td>Giá trị đầu/cuối</td></tr>
</table>`
      }
    ]
  },

  t3: {
    title: "dplyr – JOIN 2 bộ dữ liệu",
    icon: "🔗",
    badge: "Tuần 1+3",
    mode: "theory",
    cards: [
      {
        title: "Ghép theo cột (JOIN)",
        icon: "⬅️➡️",
        html: `<p>Cần biến chung (<strong>key</strong>) để ghép.</p>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>inner_join(d1, d2, by = "key")  # chỉ chung
left_join(d1, d2, by = "key")   # giữ tất cả d1
right_join(d1, d2, by = "key")  # giữ tất cả d2
full_join(d1, d2, by = "key")   # giữ tất cả</pre></div>
<h4>So sánh JOIN</h4>
<table class="kv-table">
<tr><th>Loại</th><th>Giữ dòng</th></tr>
<tr><td><code>inner_join</code></td><td>Chỉ quan sát chung</td></tr>
<tr><td><code>left_join</code></td><td>Tất cả từ bảng trái</td></tr>
<tr><td><code>right_join</code></td><td>Tất cả từ bảng phải</td></tr>
<tr><td><code>full_join</code></td><td>Tất cả từ cả hai</td></tr>
</table>`
      },

      {
        title: "Set Operations & Bind",
        icon: "🔄",
        html: `<p>Yêu cầu: cùng cấu trúc cột.</p>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># Set operations (cần cùng cấu trúc cột)
intersect(d1, d2)    # dòng chung
union(d1, d2)        # tất cả (bỏ trùng)
setdiff(d1, d2)      # trong d1 không có trong d2

# Nối đơn giản (không kiểm tra)
bind_rows(d1, d2)    # nối dòng
bind_cols(d1, d2)    # nối cột (cùng số dòng!)</pre></div>`
      }
    ]
  },

  t4: {
    title: "tidyr – Chỉnh hình dữ liệu",
    icon: "🔄",
    badge: "Tuần 3",
    mode: "theory",
    cards: [
      {
        title: "gather, spread",
        icon: "🔀",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># GATHER – chuyển cột thành dòng (wide → long)
gather(dat, tên_cột_key, tên_cột_value, cột1, cột2, ...)
# VD: gather(diemthi, mon, diem, van, ngoaingu, toan)

# SPREAD – chuyển dòng thành cột (long → wide)
spread(dat, cột_key, cột_value)</pre></div>`
      },
      {
        title: "separate, unite, gsub",
        icon: "✂️",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># SEPARATE – tách 1 cột thành nhiều
separate(dat, col, into = c("col1","col2"),
  sep = "-", remove = TRUE)

# UNITE – gộp nhiều cột thành 1
unite(dat, col = "tên_mới", col1, col2,
  sep = "_", remove = TRUE)

# GSUB – thay thế ký tự
gsub("old", "new", dat$col)
# VD: dat$week &lt;- gsub("wk", "", dat$week)</pre></div>`
      }
    ]
  },

  t5: {
    title: "Bảng & Đồ thị",
    icon: "📈",
    badge: "Tuần 3",
    mode: "theory",
    cards: [
      {
        title: "Lập bảng (table & tabular)",
        icon: "📋",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># BẢNG TẦN SỐ
table(dat$col)
tab &lt;- table(dat$col1, dat$col2)  # bảng chéo
addmargins(tab)                    # thêm tổng

# BẢNG TẦN SUẤT
prop.table(tab)       # tỷ lệ chung
prop.table(tab, 1)    # theo dòng
prop.table(tab, 2)    # theo cột
round(100*prop.table(tab), 2)

# TABULAR (package tables)
tabular(col1 ~ 1)               # tần số
tabular(col1 ~ Percent())       # tần suất
tabular(col1 + 1 ~ col2 + 1)    # có tổng</pre></div>`
      },
      {
        title: "ggplot2 – Đồ thị",
        icon: "📊",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># Cấu trúc cơ bản
ggplot(data, aes(x = col_x, y = col_y)) +
  geom_loại() +          # biểu đồ
  labs() +                # nhãn
  theme_minimal()         # hình nền

# Biểu đồ cột
ggplot(dat, aes(x = cut)) +
  geom_bar(fill = "steelblue") +
  labs(title = "Tần số", x = "Cut", y = "Count")

# Phân tán (scatter)
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
ggplotly(p)  # p là ggplot object</pre></div>
<h4>Đồ thị cơ bản (plot)</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>plot(dat$x, dat$y, type = "p", main = "Title")
hist(dat$x)
boxplot(dat$x)
barplot(table(dat$x))
pie(table(dat$x))</pre></div>
<h4>Đồ thị tương quan</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(ggcorrplot)
ggcorrplot(cor(dat), method = "circle",
  type = "upper", lab = TRUE,
  colors = c("blue", "white", "red"))</pre></div>`
      }
    ]
  },

  t6: {
    title: "Giới thiệu Khai phá Dữ liệu",
    icon: "⛏️",
    badge: "Tuần 5",
    mode: "theory",
    cards: [
      {
        title: "Khai phá Dữ liệu là gì?",
        icon: "🎯",
        html: `<p><strong>Khai phá dữ liệu (Data Mining)</strong> = Hệ thống phương pháp áp dụng cho CSDL lớn, phức tạp để loại bỏ yếu tố ngẫu nhiên, khám phá mẫu/mô hình, quy luật tiềm ẩn.</p>
<p>Là lĩnh vực <strong>liên ngành</strong>: Cơ sở dữ liệu + Thống kê + Thuật toán + Máy học + Trực quan hóa</p>
<h4>Quy trình</h4>
<p><span class="tag tag-blue">Dữ liệu vào</span> → <span class="tag tag-purple">Tiền xử lý</span> → <span class="tag tag-green">Khai phá</span> → <span class="tag tag-orange">Đánh giá mô hình</span> → <span class="tag tag-pink">Tri thức</span></p>`
      },
      {
        title: "Phân loại kỹ thuật KPDL",
        icon: "🗂️",
        html: `<table class="compare-table">
<tr><th>Loại</th><th style="color:var(--accent-purple)">Mô tả (Descriptive)</th><th style="color:var(--accent-green)">Dự đoán (Predictive)</th></tr>
<tr><td>Phương pháp</td><td>Phân cụm, Luật kết hợp, Phát hiện bất thường</td><td>Phân loại, Hồi quy, Dãy thời gian</td></tr>
<tr><td>Học</td><td>Không giám sát</td><td>Có giám sát</td></tr>
<tr><td>Ứng dụng</td><td>Phân đoạn KH, bày kệ hàng, phát hiện gian lận</td><td>Phân loại KH/email, nhận dạng, dự đoán</td></tr>
</table>
<h4>Dữ liệu</h4>
<table class="compare-table">
<tr><th></th><th style="color:var(--accent-blue)">Có cấu trúc</th><th style="color:var(--accent-orange)">Phi cấu trúc</th></tr>
<tr><td>Biểu diễn</td><td>Bảng / dòng / cột</td><td>Hình ảnh, video, email, text</td></tr>
<tr><td>Tỷ lệ</td><td>~20% dữ liệu DN</td><td>~80% dữ liệu DN</td></tr>
<tr><td>Quản lý</td><td>Dễ</td><td>Khó</td></tr>
</table>`
      }
    ]
  },

  t7: {
    title: "Tiền xử lý – Missing Data",
    icon: "🩹",
    badge: "Tuần 7",
    mode: "theory",
    cards: [
      {
        title: "Cơ chế khuyết thiếu dữ liệu",
        icon: "❓",
        html: `<table class="compare-table">
<tr><th></th><th style="color:var(--accent-green)">MCAR</th><th style="color:var(--accent-blue)">MAR</th><th style="color:var(--accent-red)">MNAR</th></tr>
<tr><td>Phân phối</td><td>Ngẫu nhiên</td><td>Phi ngẫu nhiên</td><td>Phi ngẫu nhiên</td></tr>
<tr><td>Khả năng khuyết</td><td>Như nhau</td><td>Khác nhau</td><td>Khác nhau</td></tr>
<tr><td>Liên quan</td><td>Không biến nào</td><td>Biến khác (không biến chứa NA)</td><td>Chỉ biến chứa NA</td></tr>
<tr><td>Dự báo được?</td><td>Không</td><td>Có</td><td>Không</td></tr>
<tr><td>Xử lý</td><td>Loại bỏ / Thay thế</td><td>Thay thế / Chuyên sâu</td><td>Thu thập thêm</td></tr>
</table>`
      },
      {
        title: "Code R – Kiểm tra & Xử lý Missing",
        icon: "💻",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># KIỂM TRA
anyNA(dat)                     # Có NA không?
is.na(dat)                     # Ma trận TRUE/FALSE
sum(is.na(dat))                # Tổng số NA
colSums(is.na(dat))            # Số NA theo cột
rowSums(is.na(dat))            # Số NA theo dòng

# ĐỒ THỊ (visdat)
library(visdat)
vis_dat(dat)
vis_miss(dat)

# ĐỒ THỊ (VIM)
library(VIM)
aggr(dat, numbers=TRUE, prop=FALSE, sortVars=TRUE)
matrixplot(dat)
marginplot(dat[c("var1", "var2")])

# KIỂM ĐỊNH MCAR (naniar)
library(naniar)
mcar_test(dat)   # H0: MCAR, H1: MAR

# XÓA
na.omit(dat)                   # Xóa dòng có NA
drop_na(dat)                   # Tương tự (tidyr)
drop_na(dat, col1)             # Xóa NA ở 1 cột
dat[colSums(is.na(dat)) == 0]  # Xóa cột có NA

# THAY THẾ bằng trung bình/trung vị
dat %&gt;% mutate(col1 = case_when(
  is.na(col1) ~ mean(col1, na.rm = TRUE),
  TRUE ~ col1
))

# Package mice
library(mice)
complete(mice(dat, method = "mean"))       # Trung bình
complete(mice(dat, method = "sample"))     # Hot-deck
complete(mice(dat, method = "norm.predict")) # Hồi quy
complete(mice(dat, method = "cart"))        # Cây quyết định
complete(mice(dat, method = "rf"))          # Rừng ngẫu nhiên

# Package VIM
library(VIM)
hotdeck(dat)                               # Hot-deck</pre></div>`
      }
    ]
  },

  t8: {
    title: "Tiền xử lý – Outlier",
    icon: "📍",
    badge: "Tuần 7",
    mode: "theory",
    cards: [
      {
        title: "Nhiễu vs Đột xuất",
        icon: "⚖️",
        html: `<table class="compare-table">
<tr><th></th><th style="color:var(--accent-red)">Nhiễu (Noise)</th><th style="color:var(--accent-orange)">Đột xuất (Outlier)</th></tr>
<tr><td>Bản chất</td><td>Không phải giá trị thực</td><td>Có thể là giá trị thực</td></tr>
<tr><td>Ảnh hưởng</td><td>Overfit mô hình</td><td>Tăng phương sai, giảm hiệu quả</td></tr>
<tr><td>Phân phối</td><td>Theo phân phối dữ liệu</td><td>Không theo phân phối</td></tr>
</table>`
      },
      {
        title: "Code R – Xác định Outlier",
        icon: "🔬",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># Z-SCORE (mean ± 3*sd)
LB &lt;- mean(dat$x) - 3 * sd(dat$x)
UB &lt;- mean(dat$x) + 3 * sd(dat$x)
filter(dat, x &lt; LB | x &gt; UB)

# HAMPEL FILTER (median ± 3*mad)
LB &lt;- median(dat$x) - 3 * mad(dat$x)
UB &lt;- median(dat$x) + 3 * mad(dat$x)
filter(dat, x &lt; LB | x &gt; UB)

# BOXPLOT
bp &lt;- boxplot(dat$x)
bp$out   # Giá trị đột xuất

# Histogram
hist(dat$x)</pre></div>
<h4>Kiểm định thống kê</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># Grubbs (package outliers)
library(outliers)
grubbs.test(dat$x, type = 10)  # 1 outlier, 1 phía
grubbs.test(dat$x, type = 11)  # 1 outlier, 2 phía

# Dixon (mẫu nhỏ &lt; 25-30)
dixon.test(dat$x)

# Rosner (package EnvStats, mẫu lớn &gt; 20)
library(EnvStats)
rosnerTest(dat$x, k = 3, alpha = 0.05)</pre></div>`
      }
    ]
  },

  // ============ PRACTICE CHAPTERS ============
  p1: {
    title: "BT: R Cơ bản (Tuần 2)",
    icon: "✏️",
    badge: "3 bài",
    mode: "practice",
    exercises: [
      {
        num: "1", color: "var(--accent-blue)",
        title: "Nhập dữ liệu product, kiểm tra, lưu file Excel",
        task: `Tạo dataframe <strong>product</strong> gồm: ProdID (P01-P04), Category (Electronics, Fashion, Electronics, Food), Price_Level (High, Medium, Low, Medium). Kiểm tra trong Console. Lưu thành <strong>bai1.xlsx</strong>.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>product &lt;- data.frame(
  ProdID = c("P01", "P02", "P03", "P04"),
  Category = c("Electronics", "Fashion", "Electronics", "Food"),
  Price_Level = c("High", "Medium", "Low", "Medium")
)
product
library(writexl)
write_xlsx(product, "bai1.xlsx")</pre></div>`
      },
      {
        num: "2", color: "var(--accent-purple)",
        title: "Dữ liệu iris – đổi tên, thống kê, lưu",
        task: `Đọc iris. Kiểm tra cấu trúc, in 10 dòng đầu/cuối. Tạo dataframe <strong>bai2</strong> chỉ chứa Sepal.Length (→ chieu_dai_canh) và Species (→ loai_hoa). Tính thống kê mô tả. Lưu bai2.xlsx.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(dplyr); library(writexl)
data("iris")
str(iris)
head(iris, 10); tail(iris, 10)

bai2 &lt;- iris %&gt;%
  select(Sepal.Length, Species) %&gt;%
  rename(chieu_dai_canh = Sepal.Length,
         loai_hoa = Species)
summary(bai2$chieu_dai_canh)
write_xlsx(bai2, "bai2.xlsx")</pre></div>`
      }
    ]
  },

  p2: {
    title: "BT: dplyr Cơ bản (Bài 4)",
    icon: "✏️",
    badge: "10 câu",
    mode: "practice",
    exercises: [
      {
        num: "1-3", color: "var(--accent-green)",
        title: "air-quality: select, kiểm tra NA, slice_max/min",
        task: `1) Tạo <strong>bai5</strong> gồm year, month, aqi, aqi_categ.<br>2) Kiểm tra cấu trúc & giá trị trống.<br>3) In 15 quan sát aqi lớn nhất / nhỏ nhất.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(dplyr)
air &lt;- read.csv("air-quality.csv")
bai5 &lt;- select(air, year, month, aqi, aqi_categ)
str(bai5)
colSums(is.na(bai5))
slice_max(bai5, aqi, n = 15)
slice_min(bai5, aqi, n = 15)</pre></div>`
      },
      {
        num: "4-6", color: "var(--accent-cyan)",
        title: "group_by + summarise, thống kê mô tả",
        task: `4) TB & trung vị aqi theo năm+tháng.<br>5) Số quan sát mỗi năm.<br>6) Thống kê mô tả aqi, bảng tần số aqi_categ.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># 4
bai5 %&gt;% group_by(year, month) %&gt;%
  summarise(aqi_mean = mean(aqi, na.rm=T),
            aqi_med = median(aqi, na.rm=T))
# 5
bai5 %&gt;% group_by(year) %&gt;% summarise(n = n())
# 6
summary(bai5$aqi)
table(bai5$aqi_categ)</pre></div>`
      },
      {
        num: "7-9", color: "var(--accent-orange)",
        title: "mutate + case_when tạo quarter, lọc phức hợp",
        task: `7) Tạo biến <strong>quarter</strong> (1-4) sau cột year. Lưu bai4.xlsx.<br>8) Lọc Q4/2016, đếm aqi_categ.<br>9) Tháng nào Q4/2016 nhiều Unhealthy nhất?`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># 7
bai5 &lt;- bai5 %&gt;% mutate(quarter = case_when(
  month &lt;= 3 ~ 1, month &lt;= 6 ~ 2,
  month &lt;= 9 ~ 3, TRUE ~ 4), .after = year)
write_xlsx(bai5, "bai4.xlsx")
# 8
q4 &lt;- filter(bai5, quarter==4, year==2016)
nrow(q4); table(q4$aqi_categ)
# 9
q4 %&gt;% filter(aqi_categ == "Unhealthy") %&gt;%
  group_by(month) %&gt;% summarise(n=n()) %&gt;%
  arrange(desc(n))</pre></div>`
      }
    ]
  },

  p3: {
    title: "BT: Gapminder (Bài 4)",
    icon: "🌍",
    badge: "3 câu",
    mode: "practice",
    exercises: [
      {
        num: "1-3", color: "var(--accent-pink)",
        title: "group_by, filter VN, percent_rank GDP",
        task: `1) TB tuổi thọ & dân số theo châu lục.<br>2) Data Việt Nam, tính GDP = pop × gdpPercap.<br>3) Năm 2007: phân vị GDP, in top/bottom 10%.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(gapminder); library(dplyr)
# 1
cau1 &lt;- gapminder %&gt;% group_by(continent) %&gt;%
  summarise(mean_lifeExp = mean(lifeExp),
            mean_pop = mean(pop))
# 2
vn &lt;- gapminder %&gt;% filter(country=="Vietnam") %&gt;%
  select(lifeExp, pop, gdpPercap, year) %&gt;%
  mutate(GDP = pop * gdpPercap)
# 3
g2007 &lt;- gapminder %&gt;% filter(year==2007) %&gt;%
  mutate(pct = percent_rank(gdpPercap))
g2007 %&gt;% filter(pct &gt;= 0.9) %&gt;%
  select(country, continent, gdpPercap, pct)
g2007 %&gt;% filter(pct &lt;= 0.1) %&gt;%
  select(country, continent, gdpPercap, pct)</pre></div>`
      }
    ]
  },

  p4: {
    title: "BT: JOIN & tidyr (Bài 6)",
    icon: "🔗",
    badge: "17 câu",
    mode: "practice",
    exercises: [
      {
        num: "1-7", color: "var(--accent-blue)",
        title: "JOIN band_instruments & band_members",
        task: `Ghép cột/dòng band_instruments, band_instruments2, band_members bằng inner/left/right/full_join, intersect, union, setdiff, bind_rows, bind_cols.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(dplyr)
# Ghép cột
inner_join(band_instruments, band_members, by="name")
left_join(band_instruments, band_members, by="name")
full_join(band_instruments, band_members, by="name")

# Đổi tên + thêm dòng
band &lt;- band_instruments %&gt;%
  rename(artist = name) %&gt;%
  bind_rows(data.frame(artist="Tom", plays="bass"))

# Set operations
intersect(band, band_instruments2)
union(band, band_instruments2)
setdiff(band, band_instruments2)
bind_rows(band, band_instruments2)</pre></div>`
      },
      {
        num: "1-9", color: "var(--accent-purple)",
        title: "billboard: gather, gsub, separate, summarise",
        task: `Dữ liệu billboard (tidyr): gather cột thành dòng, xóa "wk", tách date.entered, tạo quarter, tính thứ hạng TB.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(tidyr); library(dplyr)
data("billboard")
bb_long &lt;- billboard %&gt;%
  gather(week, rank, wk1:wk76) %&gt;%
  drop_na(rank) %&gt;%
  arrange(rank)
bb_long$week &lt;- gsub("wk", "", bb_long$week)
bb_long &lt;- separate(bb_long, date.entered,
  into = c("year","month","day"), sep = "-")
bb_long &lt;- bb_long %&gt;%
  mutate(month = as.numeric(month)) %&gt;%
  mutate(quarter = case_when(
    month &lt;= 3 ~ 1, month &lt;= 6 ~ 2,
    month &lt;= 9 ~ 3, TRUE ~ 4))
bb_long %&gt;% group_by(artist, track) %&gt;%
  summarise(avg_rank = mean(rank)) %&gt;%
  arrange(avg_rank)</pre></div>`
      }
    ]
  },

  p5: {
    title: "BT: Bảng & Đồ thị (Bài 7)",
    icon: "📊",
    badge: "16+ câu",
    mode: "practice",
    exercises: [
      {
        num: "B1", color: "var(--accent-green)",
        title: "diamonds: bảng tần số, bảng chéo, geom_bar",
        task: `Bảng tần số cut (giảm dần). Bảng chéo cut × color + tổng. Xóa 53000 dòng đầu, bảng chéo cut × table. Đồ thị cột cut.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(ggplot2); library(tables)
data("diamonds")
sort(table(diamonds$cut), decreasing = TRUE)
addmargins(table(diamonds$cut, diamonds$color))
dia2 &lt;- diamonds %&gt;% slice(-(1:53000))
table(dia2$cut, dia2$table)
ggplot(diamonds, aes(x=cut)) +
  geom_bar(fill="steelblue") + theme_minimal()</pre></div>`
      },
      {
        num: "B2.1-8", color: "var(--accent-cyan)",
        title: "midwest: filter, select, mutate, distinct, sample",
        task: `Lọc Indiana, Ohio (popwhite 40-85k), chọn cột, sắp xếp, lọc MI, tính TB nghèo, sample 10%, distinct, đổi tên PID.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(ggplot2); library(dplyr)
c1 &lt;- filter(midwest, state == "IN")
c2 &lt;- filter(midwest, state=="OH",
  popwhite&gt;=40000, popwhite&lt;=85000)
c3 &lt;- midwest %&gt;% filter(state=="OH") %&gt;%
  select(state,county,poptotal,popamerindian,
    percamerindian) %&gt;% arrange(desc(popamerindian))
c4 &lt;- midwest %&gt;% filter(state=="MI",
  poppovertyknown&gt;10000, percprof&gt;12) %&gt;%
  select(state,county,poppovertyknown,percprof)
midwest %&gt;% group_by(state) %&gt;%
  summarise(m=mean(poppovertyknown)) %&gt;%
  arrange(desc(m))
c6 &lt;- sample_frac(midwest, 0.1)
combine &lt;- bind_rows(c6, midwest)
c72 &lt;- distinct(combine)
c82 &lt;- rename(combine, \`2\` = PID)</pre></div>`
      },
      {
        num: "B2.9-16", color: "var(--accent-orange)",
        title: "midwest: bảng, ggplot, NA, case_when",
        task: `Bảng tần số/suất state. scatter poptotal vs popdensity. boxplot percelderlypoverty theo state. Kiểm tra NA. Tạo level_poverty. TB popasian theo state.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># Bảng + đồ thị
table(midwest$state)
ggplot(midwest, aes(x=state)) + geom_bar()
ggplot(midwest, aes(x=poptotal, y=popdensity)) +
  geom_point(alpha=0.5)
ggplot(midwest, aes(x=state, y=percelderlypoverty)) +
  geom_boxplot(fill="lightblue")
# NA
anyNA(midwest); colSums(is.na(midwest))
# Các bang
midwest %&gt;% group_by(state) %&gt;% summarise(n=n())
# Level poverty
midwest %&gt;% mutate(level_poverty = case_when(
  percbelowpoverty&lt;15 ~ "low",
  percbelowpoverty&lt;=50 ~ "medium",
  TRUE ~ "high")) %&gt;%
  select(county,state,percamerindian,level_poverty) %&gt;%
  group_by(level_poverty) %&gt;% summarise(n=n())
# TB popasian
midwest %&gt;% group_by(state) %&gt;%
  summarise(m=mean(popasian,na.rm=T),
            med=median(popasian,na.rm=T))</pre></div>`
      }
    ]
  },

  // ============ THEORY: TUẦN 9-13 ============
  t9: {
    title: "Phân cụm (Clustering)",
    icon: "🧩",
    badge: "Tuần 9",
    mode: "theory",
    cards: [
      {
        title: "Khái niệm & Phân loại",
        icon: "🎯",
        html: `<p><strong>Phân cụm</strong> = học <em>không giám sát</em>, chia quan sát thành các cụm sao cho trong cụm giống nhau, khác cụm khác nhau.</p>
<table class="compare-table">
<tr><th>Nhóm</th><th>Thuật toán</th><th>Đặc điểm</th></tr>
<tr><td>Phân cấp</td><td><code>hclust</code></td><td>Cây dendrogram, không cần chọn k trước</td></tr>
<tr><td>Phân hoạch</td><td><code>kmeans</code>, <code>pam</code>, <code>clara</code></td><td>Cần chọn k, tối ưu khoảng cách tới tâm</td></tr>
<tr><td>Dữ liệu định tính</td><td><code>kmodes</code></td><td>Thay mean bằng mode</td></tr>
</table>
<h4>Chọn số cụm k</h4>
<table class="kv-table">
<tr><th>Phương pháp</th><th>Nguyên tắc</th></tr>
<tr><td>Elbow (WSS)</td><td>Chọn k tại điểm "gập khuỷu"</td></tr>
<tr><td>Silhouette</td><td>Max silhouette trung bình (càng gần 1 càng tốt)</td></tr>
<tr><td>Gap statistic</td><td>So sánh WSS với dữ liệu ngẫu nhiên</td></tr>
</table>`
      },
      {
        title: "Phân cụm phân cấp (Hierarchical)",
        icon: "🌲",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># Bước 1: Ma trận khoảng cách
d &lt;- dist(dat)           # Euclidean mặc định

# Bước 2: Cây phân cấp
hc &lt;- hclust(d)          # method="complete" mặc định
plot(hc)                 # dendrogram

# Đồ thị đẹp hơn
library(ggdendro)
library(ape)
ggdendrogram(hc)
ggdendrogram(hc, rotate = TRUE)

# Bước 3: Cắt cây thành k cụm
clus3 &lt;- cutree(hc, k = 3)
clus3                    # vector nhãn cụm

# Tô màu cây
colors &lt;- c("red","blue","green","yellow")
plot(as.phylo(hc), tip.color = colors[clus3],
     label.offset = 1, cex = 0.7)
plot(as.phylo(hc), tip.color = colors[clus3],
     type = "fan")       # hình tròn

# Gán cụm vào dữ liệu + tổng hợp
library(dplyr)
dat_cl &lt;- bind_cols(as.data.frame(clus3), dat)
dat_cl %&gt;% group_by(clus3) %&gt;%
  summarise(across(everything(), mean))</pre></div>`
      },
      {
        title: "K-means",
        icon: "🎯",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(factoextra)
df &lt;- scale(dat)              # chuẩn hóa z-score trước

# CHỌN K TỐI ƯU
fviz_nbclust(df, kmeans, method = "wss") +
  labs(subtitle = "Elbow method")
fviz_nbclust(df, kmeans, method = "silhouette") +
  labs(subtitle = "Silhouette")
fviz_nbclust(df, kmeans, method = "gap_stat",
             nstart = 25, nboot = 50) +
  labs(subtitle = "Gap statistic")

# CHẠY K-MEANS (giả sử k = 3)
set.seed(123)
km &lt;- kmeans(df, centers = 3, nstart = 25)
km$centers        # tâm cụm
km$cluster        # nhãn cụm
km$withinss       # WSS từng cụm
km$tot.withinss   # tổng WSS
km$iter           # số vòng lặp

# ĐỒ THỊ
fviz_cluster(km, df)
fviz_cluster(km, df, ellipse.type = "norm")

# GẮN CỤM VÀO DỮ LIỆU
dat_cl &lt;- bind_cols(as.data.frame(km$cluster), dat)
dat_cl %&gt;% group_by(\`km$cluster\`) %&gt;%
  summarise(across(everything(), mean))

# ĐÁNH GIÁ CHẤT LƯỢNG
library(cluster)
sl &lt;- silhouette(km$cluster, dist(df))
fviz_silhouette(sl)</pre></div>
<div class="alert alert-warn"><span class="alert-icon">⚠️</span>Luôn <code>scale()</code> trước k-means để tránh biến có đơn vị lớn chi phối khoảng cách.</div>`
      },
      {
        title: "PAM, CLARA, K-modes",
        icon: "🔷",
        html: `<h4>PAM (Partitioning Around Medoids)</h4>
<p>Thay tâm (mean) bằng <strong>medoid</strong> (điểm thực trong dữ liệu) → bền với đột xuất.</p>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(fpc); library(cluster); library(factoextra)
df &lt;- scale(dat)
pam3 &lt;- pam(df, k = 3, metric = "euclidean", stand = FALSE)
pam3$medoids      # các điểm đại diện
pam3$clustering   # nhãn cụm</pre></div>
<h4>CLARA (Clustering Large Applications)</h4>
<p>PAM cho dữ liệu lớn — lấy mẫu rồi áp dụng PAM.</p>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(cluster)
clarax &lt;- clara(dat[1:4], k = 3)
print(clarax)
plot(dat, col = clarax$cluster)</pre></div>
<h4>K-modes (dữ liệu định tính)</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(klaR)
cl &lt;- kmodes(dat_cat, modes = 4,
             iter.max = 200, weighted = FALSE, fast = TRUE)
cl$modes     # các mode đại diện
cl$size      # cỡ mỗi cụm
cl$cluster   # nhãn cụm</pre></div>`
      }
    ]
  },

  t10: {
    title: "Luật kết hợp (Association Rules)",
    icon: "🛒",
    badge: "Tuần 11",
    mode: "theory",
    cards: [
      {
        title: "Khái niệm & độ đo",
        icon: "📐",
        html: `<p>Tìm <strong>quy luật dạng X ⇒ Y</strong> trong giao dịch (ví dụ: <em>mua bỉm ⇒ mua bia</em>).</p>
<table class="kv-table">
<tr><th>Độ đo</th><th>Công thức</th><th>Ý nghĩa</th></tr>
<tr><td>Support</td><td>P(X ∩ Y)</td><td>Tỷ lệ giao dịch chứa cả X và Y</td></tr>
<tr><td>Confidence</td><td>P(Y | X) = sup(X∪Y)/sup(X)</td><td>Khi có X thì có Y với xác suất bao nhiêu</td></tr>
<tr><td>Lift</td><td>conf / sup(Y)</td><td>&gt;1: X,Y tương quan; =1: độc lập; &lt;1: đẩy nhau</td></tr>
</table>
<h4>Thuật toán</h4>
<table class="compare-table">
<tr><th></th><th style="color:var(--accent-blue)">Apriori</th><th style="color:var(--accent-green)">FP-Growth</th><th style="color:var(--accent-orange)">Eclat</th></tr>
<tr><td>Ý tưởng</td><td>Sinh ứng viên lặp</td><td>Cây FP-Tree</td><td>Tập giao dịch dạng dọc</td></tr>
<tr><td>Tốc độ</td><td>Chậm với DB lớn</td><td>Nhanh</td><td>Nhanh cho tập dày đặc</td></tr>
</table>`
      },
      {
        title: "Code R – Apriori",
        icon: "💻",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(arules)

# ĐỌC GIAO DỊCH (mỗi dòng = 1 giao dịch, items cách nhau dấu phẩy)
trans &lt;- read.transactions("file.csv",
                           format = "basket",
                           sep = ",",
                           rm.duplicates = FALSE)
summary(trans)
itemFrequencyPlot(trans, topN = 10)

# CHẠY APRIORI
rules &lt;- apriori(trans,
  parameter = list(minlen = 1, support = 0.1, confidence = 0.3),
  control = list(verbose = FALSE))

# XEM LUẬT (sắp xếp theo lift)
inspect(sort(rules, by = "lift"))

# LỌC LUẬT THỪA (dư thừa nếu có luật con đạt conf tương đương)
redundant &lt;- is.redundant(rules, measure = "confidence")
rule1 &lt;- rules[!redundant]
inspect(rule1)

# CHỈ XEM LUẬT DẪN ĐẾN 1 ITEM CỤ THỂ (ví dụ: COVID-19)
rules2 &lt;- apriori(trans,
  parameter = list(minlen = 1, support = 0.1, confidence = 0.3),
  appearance = list(rhs = c("COVID-19"), default = "lhs"),
  control = list(verbose = FALSE))
inspect(sort(rules2, by = "lift"))</pre></div>`
      },
      {
        title: "FP-Growth & Eclat",
        icon: "🌿",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># FP-GROWTH (package rCBA, yêu cầu Java)
library(rCBA); library(rJava)
rules3 &lt;- rCBA::fpgrowth(trans,
  support = 0.1, confidence = 0.3, maxLength = 5,
  consequent = NULL, verbose = TRUE, parallel = FALSE)

# ECLAT (IT-Tree) – chỉ tìm itemset phổ biến, không sinh luật
library(arules)
its &lt;- eclat(trans, parameter = list(supp = 0.1, maxlen = 5))
inspect(sort(its, by = "support"))</pre></div>`
      }
    ]
  },

  t11: {
    title: "Khai phá mẫu tuần tự",
    icon: "🧬",
    badge: "Tuần 11",
    mode: "theory",
    cards: [
      {
        title: "Khái niệm & ứng dụng",
        icon: "🔎",
        html: `<p><strong>Mẫu tuần tự (Sequential pattern)</strong> = chuỗi sự kiện xảy ra theo <em>thứ tự thời gian</em> lặp ở nhiều đối tượng.</p>
<p>Khác luật kết hợp: quan tâm <strong>thứ tự</strong> giữa các item (X → Y, không phải X ∧ Y).</p>
<h4>Ứng dụng</h4>
<table class="kv-table">
<tr><th>Lĩnh vực</th><th>Ví dụ</th></tr>
<tr><td>Bán lẻ / TMĐT</td><td>Giỏ hàng theo thời gian, gợi ý sản phẩm</td></tr>
<tr><td>Y tế</td><td>Chuỗi triệu chứng/điều trị, phân tích DNA</td></tr>
<tr><td>Giáo dục</td><td>Lộ trình học tập của sinh viên</td></tr>
<tr><td>Tài chính</td><td>Giao dịch gian lận thẻ, chuỗi giá chứng khoán</td></tr>
</table>
<h4>Khái niệm</h4>
<table class="kv-table">
<tr><th>Khái niệm</th><th>Mô tả</th></tr>
<tr><td>sequenceID</td><td>ID đối tượng (vd: bệnh nhân)</td></tr>
<tr><td>eventID</td><td>Thời điểm / thứ tự sự kiện</td></tr>
<tr><td>size</td><td>Số item trong 1 sự kiện</td></tr>
<tr><td>Support</td><td>Tỷ lệ đối tượng chứa mẫu</td></tr>
</table>`
      },
      {
        title: "Code R – SPADE",
        icon: "💻",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(arules)
library(arulesSequences)
library(dplyr)

# Đọc dữ liệu dạng transactions cho chuỗi
seqs &lt;- read_baskets("medical_seq.txt",
                     info = c("sequenceID", "eventID", "size"))

# SPADE: support = 0.1 → mẫu xuất hiện ở ≥10% đối tượng
s1 &lt;- cspade(seqs,
  parameter = list(support = 0.1, maxsize = 1, maxlen = 4),
  control   = list(verbose = TRUE))

# Chuyển sang data.frame để xem
s1_df &lt;- as(s1, "data.frame")
s1_df &lt;- s1_df[order(-s1_df$support), ]
head(s1_df, 50)</pre></div>
<div class="alert alert-info"><span class="alert-icon">ℹ️</span><strong>maxsize</strong>: số item tối đa 1 sự kiện; <strong>maxlen</strong>: độ dài tối đa của chuỗi.</div>`
      }
    ]
  },

  t12: {
    title: "Phân loại (Classification)",
    icon: "🎯",
    badge: "Tuần 13",
    mode: "theory",
    cards: [
      {
        title: "Quy trình phân loại",
        icon: "🔁",
        html: `<p><strong>Phân loại</strong> = học <em>có giám sát</em>, dự đoán biến mục tiêu (nhãn hoặc số).</p>
<p><span class="tag tag-blue">Tiền xử lý</span> → <span class="tag tag-purple">Chia train/test</span> → <span class="tag tag-green">Huấn luyện + Tune</span> → <span class="tag tag-orange">Dự đoán</span> → <span class="tag tag-pink">Đánh giá</span></p>
<h4>Chia tập dữ liệu</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(caret); library(dplyr)
set.seed(123)
# Hold-out 70:30 (phân tầng theo nhãn)
idx &lt;- createDataPartition(dat$Class, p = 0.7, list = FALSE)
train &lt;- slice(dat, idx)
test  &lt;- slice(dat, -idx)

# K-fold CV
ctrl &lt;- trainControl(method = "cv", number = 5)
# Repeated CV
ctrl &lt;- trainControl(method = "repeatedcv", number = 5, repeats = 3)
# LOOCV
ctrl &lt;- trainControl(method = "LOOCV")</pre></div>
<h4>Thuật toán chính (gói caret)</h4>
<table class="kv-table">
<tr><th>method=</th><th>Thuật toán</th></tr>
<tr><td><code>"knn"</code></td><td>K-nearest neighbour</td></tr>
<tr><td><code>"rpart"</code></td><td>Cây quyết định CART</td></tr>
<tr><td><code>"C5.0"</code></td><td>C5.0</td></tr>
<tr><td><code>"rf"</code></td><td>Random forest</td></tr>
<tr><td><code>"svmLinear"</code></td><td>SVM tuyến tính</td></tr>
</table>`
      },
      {
        title: "KNN – K Nearest Neighbours",
        icon: "👥",
        html: `<p>Dự đoán nhãn dựa vào <strong>k điểm gần nhất</strong> theo khoảng cách Euclidean. Yêu cầu <strong>chuẩn hóa</strong> trước.</p>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(caret); library(class)

# CÁCH 1: package class (cần tự tách x/y)
x_train &lt;- train[-5]; y_train &lt;- train$Species
x_test  &lt;- test[-5];  y_test  &lt;- test$Species
model_knn &lt;- knn(train = x_train, test = x_test,
                 cl = y_train, k = 5)

# CÁCH 2: package caret (tự tune k)
set.seed(123)
best_knn &lt;- train(Species ~ ., data = train,
  method     = "knn",
  preProcess = c("center","scale"),
  trControl  = trainControl(method = "cv", number = 5),
  tuneLength = 10)                         # thử 10 giá trị k
  # hoặc: tuneGrid = expand.grid(k = 1:10)
best_knn
best_knn$bestTune       # k tối ưu
plot(best_knn)          # accuracy ~ k

pred &lt;- predict(best_knn, test)
confusionMatrix(table(test$Species, pred))</pre></div>
<div class="alert alert-warn"><span class="alert-icon">⚠️</span>Nếu không truyền <code>trControl</code>, caret mặc định chạy <strong>bootstrap</strong> 25 lần.</div>`
      },
      {
        title: "Cây quyết định (Decision Tree)",
        icon: "🌳",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(rpart); library(rpart.plot); library(caret)

# CÁCH 1: rpart trực tiếp
dt &lt;- rpart(Species ~ ., data = train,
            method = "class",           # "anova" nếu y là số
            control = rpart.control(cp = 0))
printcp(dt)
plotcp(dt)                              # chọn cp tối ưu
rpart.plot(dt, type = 5, extra = 104,
           under = TRUE, cex = 0.8)

# TIÊU CHUẨN DỪNG
dt &lt;- rpart(y ~ ., data = train, method = "anova",
  control = rpart.control(minsplit = 10,    # tối thiểu để chia
                          minbucket = 3,    # tối thiểu ở lá
                          maxdepth  = 5,    # độ sâu
                          cp = 0.01))       # độ phức tạp

# DỰ ĐOÁN + ĐÁNH GIÁ
pred &lt;- predict(dt, test, type = "class")
confusionMatrix(pred, test$Species)

# CÁCH 2: caret (tự tune cp)
dt2 &lt;- train(Species ~ ., data = train,
  method    = "rpart",
  trControl = trainControl(method = "cv", number = 10),
  tuneLength = 10)
rpart.plot(dt2$finalModel)

# THUẬT TOÁN C5.0
library(C50)
m &lt;- C5.0(Species ~ ., data = train)
plot(m)</pre></div>`
      },
      {
        title: "Đánh giá mô hình",
        icon: "📏",
        html: `<h4>Biến mục tiêu định tính (phân loại)</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>mean(pred == test$Class)                    # Accuracy
confusionMatrix(table(test$Class, pred))
# Trả về: Accuracy, Kappa, Sensitivity, Specificity,
#         Precision, Recall, F1, NIR, p-value</pre></div>
<table class="kv-table">
<tr><th>Chỉ số</th><th>Ý nghĩa</th></tr>
<tr><td>Accuracy</td><td>(TP+TN)/Tổng</td></tr>
<tr><td>Sensitivity (Recall)</td><td>TP/(TP+FN) – nhận ra dương thật</td></tr>
<tr><td>Specificity</td><td>TN/(TN+FP) – nhận ra âm thật</td></tr>
<tr><td>NIR</td><td>Accuracy khi luôn đoán lớp lớn nhất</td></tr>
<tr><td>p-value (Acc&gt;NIR)</td><td>H0: Acc≤NIR. p nhỏ ⇒ MH tốt hơn ngẫu nhiên</td></tr>
</table>
<h4>Biến mục tiêu định lượng (hồi quy)</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(caret)
mse  &lt;- mean((test$y - pred)^2)
mae  &lt;- MAE(test$y, pred)
rmse &lt;- RMSE(test$y, pred)
cat("MSE:", mse, " MAE:", mae, " RMSE:", rmse)

# Vẽ so sánh
plot(test$y, col = "red", type = "l")
lines(pred, col = "blue")
legend("topright", legend = c("thực","dự đoán"),
       fill = c("red","blue"), cex = 0.7)</pre></div>`
      }
    ]
  },

  // ============ PRACTICE: TUẦN 7-13 ============
  p6: {
    title: "BT: Tiền xử lý (Bài 9 Seminar)",
    icon: "🩹",
    badge: "2 bài / 10 câu",
    mode: "practice",
    exercises: [
      {
        num: "B1.1-3", color: "var(--accent-blue)",
        title: "airquality – mô tả & kiểm tra NA",
        task: `<strong>1)</strong> Mô tả các biến trong dữ liệu <code>airquality</code>.<br>
<strong>2)</strong> Dữ liệu có NA không? Xác định số NA theo dòng, cột và tổng.<br>
<strong>3)</strong> Mô tả NA bằng đồ thị. Xác định tỷ lệ NA ở mỗi biến.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(dplyr); library(visdat); library(VIM); library(naniar)
data("airquality")

# 1) Mô tả
str(airquality)
summary(airquality)
?airquality   # Ozone, Solar.R, Wind, Temp, Month, Day

# 2) Kiểm tra NA
anyNA(airquality)
sum(is.na(airquality))             # tổng NA
colSums(is.na(airquality))         # NA theo cột
rowSums(is.na(airquality))         # NA theo dòng
table(is.na(airquality))

# 3) Đồ thị NA
vis_dat(airquality)
vis_miss(airquality)               # cho % NA mỗi cột
aggr(airquality, numbers = TRUE, prop = TRUE,
     sortVars = TRUE, sortCombs = TRUE)
matrixplot(airquality)
miss_var_summary(airquality)       # bảng % NA mỗi biến</pre></div>`
      },
      {
        num: "B1.4-5", color: "var(--accent-purple)",
        title: "airquality – MCAR test & các cách xử lý NA",
        task: `<strong>4)</strong> Xác định cơ chế khuyết (MCAR hay MAR) bằng kiểm định Little.<br>
<strong>5)</strong> Xử lý NA theo nhiều cách:<br>
&nbsp;&nbsp;a) Xóa dòng chứa NA<br>
&nbsp;&nbsp;b) Xóa cột chứa NA<br>
&nbsp;&nbsp;c) Thay NA ở <strong>Ozone</strong> bằng 0<br>
&nbsp;&nbsp;d) Thay NA ở <strong>Ozone</strong> bằng trung vị<br>
&nbsp;&nbsp;e) Thay NA toàn bộ bằng trung bình từng biến (mice "mean")<br>
&nbsp;&nbsp;f) Thay NA bằng giá trị ngẫu nhiên (hotdeck / mice "sample")<br>
&nbsp;&nbsp;g) Thay NA bằng hồi quy thường & hồi quy ngẫu nhiên<br>
&nbsp;&nbsp;h) Ozone ← mean, Solar.R ← hồi quy ngẫu nhiên`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(dplyr); library(tidyr); library(naniar)
library(mice); library(VIM)

# 4) MCAR test (H0: MCAR, H1: MAR)
mcar_test(airquality)
# p &lt; 0.05 ⇒ bác H0 ⇒ không MCAR (có thể MAR)

# 5a) Xóa dòng có NA
aq_5a &lt;- na.omit(airquality)
aq_5a &lt;- drop_na(airquality)

# 5b) Xóa cột có NA
aq_5b &lt;- airquality[, colSums(is.na(airquality)) == 0]

# 5c) Ozone NA ← 0
aq_5c &lt;- airquality %&gt;% mutate(Ozone = case_when(
  is.na(Ozone) ~ 0, TRUE ~ as.double(Ozone)))

# 5d) Ozone NA ← median
aq_5d &lt;- airquality %&gt;% mutate(Ozone = case_when(
  is.na(Ozone) ~ median(Ozone, na.rm = TRUE),
  TRUE ~ as.double(Ozone)))

# 5e) Tất cả NA ← mean (mice)
aq_5e &lt;- complete(mice(airquality, method = "mean",
                       m = 1, printFlag = FALSE))

# 5f) Tất cả NA ← ngẫu nhiên
aq_5f1 &lt;- hotdeck(airquality)                      # VIM
aq_5f2 &lt;- complete(mice(airquality, method = "sample",
                         m = 1, printFlag = FALSE))

# 5g) Hồi quy thường / hồi quy ngẫu nhiên
aq_5g1 &lt;- complete(mice(airquality, method = "norm.predict",
                        m = 1, printFlag = FALSE))
aq_5g2 &lt;- complete(mice(airquality, method = "norm.nob",
                        m = 1, printFlag = FALSE))

# 5h) Ozone ← mean, Solar.R ← norm.nob
meth &lt;- make.method(airquality)
meth["Ozone"]   &lt;- "mean"
meth["Solar.R"] &lt;- "norm.nob"
aq_5h &lt;- complete(mice(airquality, method = meth,
                       m = 1, printFlag = FALSE))</pre></div>`
      },
      {
        num: "B1.6", color: "var(--accent-green)",
        title: "airquality – trung bình theo tháng",
        task: `<strong>6)</strong> Tính giá trị trung bình các biến <strong>Ozone, Solar.R, Wind, Temp</strong> theo từng tháng (bỏ qua NA).`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(dplyr)
airquality %&gt;%
  group_by(Month) %&gt;%
  summarise(across(c(Ozone, Solar.R, Wind, Temp),
                   ~ mean(.x, na.rm = TRUE)))</pre></div>`
      },
      {
        num: "B2", color: "var(--accent-orange)",
        title: "mtcars – xác định biến có outlier & chi tiết biến hp",
        task: `<strong>1)</strong> Đọc dữ liệu <code>mtcars</code>.<br>
<strong>2)</strong> Biến nào có giá trị đột xuất?<br>
<strong>3)</strong> Xác định outlier của biến <strong>hp</strong> bằng:<br>
&nbsp;&nbsp;a) boxplot<br>
&nbsp;&nbsp;b) Z-score (mean ± 3·sd)<br>
&nbsp;&nbsp;c) Kiểm định thống kê (Grubbs / Dixon / Rosner)`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(dplyr); library(outliers); library(EnvStats)
data("mtcars")
str(mtcars)

# 2) Biến nào có outlier? – dùng boxplot tất cả cột số
par(mfrow = c(3, 4))
for (v in names(mtcars)) boxplot(mtcars[[v]], main = v)
par(mfrow = c(1, 1))
# Thường thấy: hp, wt, qsec, carb có outlier

# 3a) Boxplot cho hp
bp &lt;- boxplot(mtcars$hp, main = "hp")
bp$out                                   # giá trị đột xuất
mtcars[mtcars$hp %in% bp$out, ]          # xem xe nào

# 3b) Z-score
LB &lt;- mean(mtcars$hp) - 3 * sd(mtcars$hp)
UB &lt;- mean(mtcars$hp) + 3 * sd(mtcars$hp)
filter(mtcars, hp &lt; LB | hp &gt; UB)
# Hampel (bền hơn): median ± 3·mad
LB2 &lt;- median(mtcars$hp) - 3 * mad(mtcars$hp)
UB2 &lt;- median(mtcars$hp) + 3 * mad(mtcars$hp)
filter(mtcars, hp &lt; LB2 | hp &gt; UB2)

# 3c) Kiểm định
grubbs.test(mtcars$hp, type = 10)        # 1 outlier, 1 phía
grubbs.test(mtcars$hp, type = 11)        # 2 outlier, 2 phía
dixon.test(mtcars$hp[1:20])              # mẫu nhỏ &lt; 25
rosnerTest(mtcars$hp, k = 3, alpha = 0.05)
# p &lt; 0.05 ⇒ bác H0 "không outlier" ⇒ có outlier</pre></div>`
      }
    ]
  },

  p7: {
    title: "BT: Phân cụm",
    icon: "🧩",
    badge: "4 bài",
    mode: "practice",
    exercises: [
      {
        num: "1", color: "var(--accent-blue)",
        title: "USArrests – phân cụm phân cấp & cắt 3 cụm",
        task: `Với <code>USArrests</code>: tính ma trận khoảng cách, chạy <code>hclust</code>, vẽ dendrogram (cả <code>plot</code> và <code>ggdendrogram</code>). Cắt 3 cụm, tô màu cây theo cụm (cả dạng phylo và dạng "fan"). Gắn cụm vào dữ liệu và tính trung bình 4 biến theo cụm.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(datasets); library(dplyr)
library(ggdendro); library(ape)
data("USArrests")
dat &lt;- USArrests

# Khoảng cách + cây
d  &lt;- dist(dat)
hc &lt;- hclust(d)
plot(hc)
ggdendrogram(hc)
ggdendrogram(hc, rotate = TRUE)

# Cắt 3 cụm
clus3 &lt;- cutree(hc, 3)
clus3

# Tô màu theo cụm
colors &lt;- c("red", "blue", "green", "yellow")
plot(as.phylo(hc), tip.color = colors[clus3],
     label.offset = 1, cex = 0.7)
plot(as.phylo(hc), tip.color = colors[clus3],
     label.offset = 1, cex = 0.7, type = "fan")

# Gắn cụm + TB theo cụm
USArrests_cl &lt;- bind_cols(as.data.frame(clus3), USArrests)
USArrests_cl %&gt;% group_by(clus3) %&gt;%
  summarise(mean(Murder), mean(Assault),
            mean(UrbanPop), mean(Rape))</pre></div>`
      },
      {
        num: "2", color: "var(--accent-purple)",
        title: "USArrests – K-means: chọn k tối ưu & đánh giá",
        task: `Chuẩn hóa <code>USArrests</code>. Dùng <code>fviz_nbclust</code> với 3 phương pháp: <strong>Elbow, Silhouette, Gap statistic</strong> để chọn k. Chạy k-means với <strong>k=3</strong>, xem <code>centers</code>, <code>withinss</code>, <code>tot.withinss</code>, <code>iter</code>. Vẽ <code>fviz_cluster</code> (cả bình thường và ellipse="norm"). Tính TB 4 biến theo cụm. Đánh giá bằng silhouette.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(factoextra); library(cluster); library(dplyr)
df &lt;- scale(USArrests)

# Chọn k
fviz_nbclust(df, kmeans, method = "wss") +
  labs(subtitle = "Elbow")
fviz_nbclust(df, kmeans, method = "silhouette") +
  labs(subtitle = "Silhouette")
fviz_nbclust(df, kmeans, method = "gap_stat",
             nstart = 25, nboot = 50) +
  labs(subtitle = "Gap statistic")

# K-means k=3
set.seed(123)
km &lt;- kmeans(df, centers = 3, nstart = 25)
km$centers; km$withinss; km$tot.withinss; km$iter

fviz_cluster(km, df)
fviz_cluster(km, df, ellipse.type = "norm")

# Gán cụm + TB theo cụm
USArrests_cl &lt;- bind_cols(as.data.frame(km$cluster), USArrests)
USArrests_cl %&gt;% group_by(\`km$cluster\`) %&gt;%
  summarise(mean(Murder), mean(Assault),
            mean(UrbanPop), mean(Rape))

# Silhouette
sl &lt;- silhouette(km$cluster, dist(df))
fviz_silhouette(sl)

# Cây phân cụm qua eclust
hc_e &lt;- eclust(df, "hclust")
fviz_dend(hc_e, rect = TRUE)</pre></div>`
      },
      {
        num: "3", color: "var(--accent-cyan)",
        title: "USArrests – PAM (3 & 4 cụm) và CLARA",
        task: `<strong>PAM:</strong> phân cụm USArrests đã chuẩn hóa với <strong>k=3</strong> rồi <strong>k=4</strong>, xem medoids, gán cụm vào dữ liệu.<br>
<strong>CLARA:</strong> phân cụm USArrests thành 3 cụm, vẽ scatter tô màu theo cụm.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(fpc); library(factoextra); library(cluster)

# PAM
Arrest &lt;- na.omit(USArrests)
Arrest &lt;- scale(Arrest)

pam3 &lt;- pam(Arrest, 3, metric = "euclidean", stand = FALSE)
print(pam3)
pam3$medoids
head(pam3$clustering)

dd &lt;- cbind(Arrest, cluster = pam3$cluster)
head(dd, 10)

pam4 &lt;- pam(Arrest, 4, metric = "euclidean", stand = FALSE)
print(pam4)
pam4$medoids
head(pam4$clustering)

# CLARA
USA_clara &lt;- USArrests
clarax &lt;- clara(USA_clara[1:4], k = 3)
print(clarax)
plot(USA_clara, col = clarax$cluster)</pre></div>`
      },
      {
        num: "4", color: "var(--accent-orange)",
        title: "babies.csv – K-modes với dữ liệu định tính",
        task: `Đọc <code>babies.csv</code>. Bỏ cột 1 (ID), đặt cột ID làm rowname. Chọn các cột định tính (4, 6, 7, 10-12). Chạy <code>kmodes</code> với <strong>4 cụm</strong> (iter.max=200, fast=TRUE). Xem <code>modes</code>, <code>size</code>. Gắn nhãn cụm vào dữ liệu.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(klaR); library(scatterplot3d)
# setwd("đường_dẫn_chứa_babies.csv")
dat &lt;- read.csv("babies.csv", sep = ",")

# Bỏ cột 1, làm rowname
dat1 &lt;- dat[,-1]
rownames(dat1) &lt;- dat[,1]

# Chọn cột định tính
dat2 &lt;- dat1[c(4, 6, 7, 10:12)]
str(dat2)

# K-modes 4 cụm
set.seed(123)
cl &lt;- kmodes(dat2, modes = 4, iter.max = 200,
             weighted = FALSE, fast = TRUE)
cl
cl$modes        # các mode đại diện
cl$size         # cỡ từng cụm

# Gắn cụm
dat3 &lt;- cbind(dat2, cluster = cl$cluster)
colnames(dat3)[7] &lt;- "cluster"
head(dat3)</pre></div>`
      }
    ]
  },

  p8: {
    title: "BT: Luật kết hợp",
    icon: "🛒",
    badge: "3 câu",
    mode: "practice",
    exercises: [
      {
        num: "1", color: "var(--accent-blue)",
        title: "benh_nhan_data – Apriori & lọc luật thừa",
        task: `Đọc <code>benh_nhan_data.csv</code> dạng <strong>transactions</strong> (format="basket", sep=","). Xem summary & itemFrequencyPlot. Chạy <strong>Apriori</strong> với <em>minlen=1, support=0.1, confidence=0.3</em>. In luật theo lift giảm dần. Loại luật thừa (measure="confidence") và in lại.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(arules)
# setwd("đường_dẫn_chứa_benh_nhan_data.csv")
trans &lt;- read.transactions("benh_nhan_data.csv",
                           format = "basket",
                           sep = ",",
                           rm.duplicates = FALSE)
summary(trans)
itemFrequencyPlot(trans, topN = 15)

# Apriori
rules &lt;- apriori(trans,
  parameter = list(minlen = 1, support = 0.1, confidence = 0.3),
  control   = list(verbose = FALSE))
inspect(sort(rules, by = "lift"))

# Loại luật thừa
redundant &lt;- is.redundant(rules, measure = "confidence")
rule1     &lt;- rules[!redundant]
inspect(rule1)</pre></div>`
      },
      {
        num: "2", color: "var(--accent-green)",
        title: "benh_nhan_data – chỉ xem luật dẫn tới COVID-19",
        task: `Dùng tham số <code>appearance</code> để chỉ lấy các luật có <strong>rhs = "COVID-19"</strong> (default="lhs"). Sort theo lift.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>rules2 &lt;- apriori(trans,
  parameter  = list(minlen = 1, support = 0.1, confidence = 0.3),
  appearance = list(rhs = c("COVID-19"), default = "lhs"),
  control    = list(verbose = FALSE))
inspect(sort(rules2, by = "lift"))</pre></div>`
      },
      {
        num: "3", color: "var(--accent-orange)",
        title: "FP-Growth & Eclat trên cùng dữ liệu",
        task: `Chạy <strong>FP-Growth</strong> (package <code>rCBA</code>) với support=0.1, conf=0.3, maxLength=5.<br>
Chạy <strong>Eclat</strong> (package <code>arules</code>) với supp=0.1, maxlen=5, in tập phổ biến theo support giảm dần.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># FP-Growth (cần Java)
library(rCBA); library(rJava)
rules3 &lt;- rCBA::fpgrowth(trans,
  support = as.numeric(0.1),
  confidence = as.numeric(0.3),
  maxLength = as.integer(5),
  consequent = NULL,
  verbose = TRUE, parallel = FALSE)

# Eclat (IT-Tree)
library(arules)
its &lt;- eclat(trans, parameter = list(supp = 0.1, maxlen = 5))
inspect(sort(its, by = "support"))</pre></div>`
      }
    ]
  },

  p9: {
    title: "BT: Khai phá mẫu tuần tự",
    icon: "🧬",
    badge: "1 bài",
    mode: "practice",
    exercises: [
      {
        num: "1", color: "var(--accent-purple)",
        title: "medical_seq.txt – SPADE tìm chuỗi y tế phổ biến",
        task: `Đọc <code>medical_seq.txt</code> bằng <code>read_baskets</code> với info = (<em>sequenceID, eventID, size</em>). Chạy <strong>SPADE</strong> (<code>cspade</code>) với support=0.1, maxsize=1, maxlen=4. Chuyển kết quả sang data.frame, sắp xếp theo support giảm dần, in 50 chuỗi đầu.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(arules)
library(arulesSequences)
library(dplyr)
# setwd("đường_dẫn_chứa_medical_seq.txt")

# Đọc dữ liệu
patient_seqs &lt;- read_baskets("medical_seq.txt",
  info = c("sequenceID", "eventID", "size"))

# SPADE – support 0.1 = ≥10% bệnh nhân
s1 &lt;- cspade(patient_seqs,
  parameter = list(support = 0.1, maxsize = 1, maxlen = 4),
  control   = list(verbose = TRUE))

# Chuyển data.frame + sắp xếp
s1_df &lt;- as(s1, "data.frame")
s1_df &lt;- s1_df[order(-s1_df$support), ]

print("Các chuỗi tuần tự y tế tìm thấy:")
head(s1_df, 50)</pre></div>`
      }
    ]
  },

  p10: {
    title: "BT: KNN (Bài 13)",
    icon: "👥",
    badge: "3 câu",
    mode: "practice",
    exercises: [
      {
        num: "B1.1-5", color: "var(--accent-blue)",
        title: "GermanCredit – load, tiền xử lý, chia 80:20",
        task: `<strong>1)</strong> Đọc <code>GermanCredit</code> (package <code>caret</code>).<br>
<strong>2)</strong> Chọn <strong>300 quan sát đầu</strong> & <strong>10 biến đầu</strong>, gán vào <code>credit</code>.<br>
<strong>3)</strong> Xác định cấu trúc dữ liệu.<br>
<strong>4)</strong> Tiền xử lý: kiểm tra NA, kiểm tra outlier (boxplot), chuẩn hóa z-score (chỉ 7 biến số đầu).<br>
<strong>5)</strong> Chia train/test theo tỷ lệ <strong>80:20</strong> (phân tầng theo Class).`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(caret); library(dplyr)

# 1-2) Load + chọn 300 quan sát × 10 biến
data("GermanCredit")
credit &lt;- GermanCredit %&gt;%
  slice(1:300) %&gt;%
  select(1:10)

# 3) Cấu trúc
str(credit)

# 4a) NA
anyNA(credit)
colSums(is.na(credit))

# 4b) Outlier – boxplot tất cả biến số
boxplot(credit)

# 4c) Chuẩn hóa z-score (7 biến số đầu)
credit1      &lt;- preProcess(credit[1:7], method = c("center","scale"))
credit_final &lt;- predict(credit1, credit)
head(credit_final)

# 5) Chia 80:20
set.seed(123)
idx      &lt;- createDataPartition(credit_final$Class, p = 0.8, list = FALSE)
training_set &lt;- slice(credit_final,  idx)
test_set     &lt;- slice(credit_final, -idx)</pre></div>`
      },
      {
        num: "B1.6-8", color: "var(--accent-purple)",
        title: "GermanCredit – KNN + dự đoán + đánh giá",
        task: `<strong>6)</strong> Phân loại theo <strong>KNN</strong> với biến <strong>Class</strong>, thử 10 giá trị k nhỏ nhất. Dùng 2 cách: <em>repeated CV 5-fold × 3 lần</em> và <em>bootstrap mặc định</em>. In <code>bestTune</code> và <code>plot</code>. Loại bỏ biến <code>Telephone</code>, <code>ForeignWorker</code> khỏi công thức.<br>
<strong>7)</strong> Dự đoán Class trên tập test.<br>
<strong>8)</strong> Đánh giá: accuracy thủ công + <code>confusionMatrix</code>.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(caret)

# --- CÁCH 1: Repeated CV (5-fold × 3 lần) ---
ctrl1 &lt;- trainControl(method = "repeatedcv", number = 5, repeats = 3)

set.seed(123)
best_knn &lt;- train(Class ~ . - Telephone - ForeignWorker,
                  data      = training_set,
                  method    = "knn",
                  trControl = ctrl1,
                  na.action = na.omit,
                  tuneLength = 10)
best_knn
plot(best_knn)
best_knn$bestTune

# 7) Dự đoán
pred &lt;- predict(best_knn, test_set)
pred

# 8) Đánh giá
mean(pred == test_set$Class)        # accuracy thủ công
confusionMatrix(table(test_set$Class, pred))
# H0: Accuracy ≤ NIR; H1: Accuracy &gt; NIR
# p-value nhỏ ⇒ MH tốt hơn đoán ngẫu nhiên

# --- CÁCH 2: Bootstrap mặc định (bỏ trControl) ---
set.seed(123)
best_knn2 &lt;- train(Class ~ . - Telephone - ForeignWorker,
                   data      = training_set,
                   method    = "knn",
                   na.action = na.omit,
                   tuneLength = 10)
best_knn2; plot(best_knn2); best_knn2$bestTune
pred2 &lt;- predict(best_knn2, test_set)
confusionMatrix(table(test_set$Class, pred2))</pre></div>`
      },
      {
        num: "B2", color: "var(--accent-green)",
        title: "Boston – KNN hồi quy cho biến medv",
        task: `Với <code>Boston</code> (package <code>MASS</code>): kiểm tra NA, chia train/test 70:30. Chạy <strong>KNN</strong> (tuneLength=10, preProcess z-score) cho biến <strong>medv</strong> (định lượng). Xem k tốt nhất. Dự đoán và tính <strong>MSE, MAE, RMSE</strong>.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(MASS); library(caret); library(dplyr)
data("Boston")
anyNA(Boston)

# Chia 70:30
set.seed(123)
idx &lt;- createDataPartition(Boston$medv, p = 0.7, list = FALSE)
training_set &lt;- slice(Boston,  idx)
test_set     &lt;- slice(Boston, -idx)

# KNN hồi quy
set.seed(123)
best_knn &lt;- train(medv ~ ., data = training_set,
  method     = "knn",
  preProcess = c("center","scale"),
  na.action  = na.omit,
  tuneLength = 10)
best_knn
best_knn$bestTune
plot(best_knn)

# Dự đoán + đánh giá
pred &lt;- predict(best_knn, test_set)
mse  &lt;- mean((test_set$medv - pred)^2)
mae  &lt;- MAE(test_set$medv,  pred)
rmse &lt;- RMSE(test_set$medv, pred)
cat("MSE:", mse, " MAE:", mae, " RMSE:", rmse)

# Đồ thị so sánh
plot(test_set$medv, col = "red", type = "l")
lines(pred, col = "blue")
legend("topright",
       legend = c("original-medv","predicted"),
       fill = c("red","blue"), cex = 0.7)</pre></div>`
      }
    ]
  },

  p11: {
    title: "BT: Cây quyết định (Bài 13)",
    icon: "🌳",
    badge: "3 câu",
    mode: "practice",
    exercises: [
      {
        num: "1", color: "var(--accent-blue)",
        title: "iris – tiền xử lý & chia 70:30",
        task: `<strong>1)</strong> Đọc <code>iris</code>, nêu cấu trúc.<br>
<strong>2)</strong> Tiền xử lý: kiểm tra NA; (nếu cần) chuẩn hóa 4 biến số.<br>
<strong>3)</strong> Chia train/test theo tỷ lệ <strong>70:30</strong> phân tầng theo Species.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(caret); library(dplyr)
data("iris")

# 1) Cấu trúc
str(iris)
summary(iris)

# 2) Tiền xử lý
anyNA(iris)                          # không có NA
# (Tùy chọn) chuẩn hóa 4 biến số – cây không cần nhưng bài yêu cầu:
iris_scaled        &lt;- iris
iris_scaled[,-5]   &lt;- scale(iris[,-5])

# 3) Chia 70:30
set.seed(123)
idx &lt;- createDataPartition(iris$Species, p = 0.7, list = FALSE)
training_set &lt;- slice(iris,  idx)
test_set     &lt;- slice(iris, -idx)</pre></div>`
      },
      {
        num: "2", color: "var(--accent-green)",
        title: "iris – xây cây quyết định (rpart, cp=0)",
        task: `<strong>4)</strong> Xây cây phân loại cho <strong>Species</strong> bằng <code>rpart</code> với <em>method="class", cp=0</em>. In <code>print</code>, <code>summary</code>, <code>plotcp</code>. Vẽ cây đẹp bằng <code>rpart.plot</code> (type=2, extra=101, under=TRUE, cex=0.8).`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(rpart); library(rpart.plot)

DT &lt;- rpart(Species ~ ., data = training_set,
            method = "class", cp = 0)
DT

print(DT)
summary(DT)
plotcp(DT)                          # biểu đồ chọn cp tối ưu

rpart.plot(DT, type = 2, extra = 101,
           under = TRUE, cex = 0.8)</pre></div>`
      },
      {
        num: "3", color: "var(--accent-orange)",
        title: "iris – dự đoán, đánh giá & cách 2 bằng caret",
        task: `<strong>5)</strong> Dự đoán Species trên tập test (<code>type="class"</code>), in <code>confusionMatrix</code>.<br>
<strong>Cách 2:</strong> dùng <code>caret::train</code> method="rpart", trControl=cv(10), tuneLength=10, preProcess z-score.`,
        solution: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>library(caret)

# 5) Dự đoán + đánh giá
pred &lt;- predict(DT, test_set, type = "class")
pred
confusionMatrix(table(test_set$Species, pred))

# --- CÁCH 2: dùng caret ---
set.seed(123)
DT2 &lt;- train(Species ~ ., data = training_set,
  method     = "rpart",
  trControl  = trainControl(method = "cv", number = 10),
  tuneLength = 10,
  preProcess = c("center","scale"),
  na.action  = na.pass)
DT2
rpart.plot(DT2$finalModel)

pred2 &lt;- predict(DT2, test_set)
confusionMatrix(table(test_set$Species, pred2))</pre></div>`
      }
    ]
  }
};
