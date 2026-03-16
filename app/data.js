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
dat &lt;- read_excel("file.xlsx", sheet = 1)

# Từ CSV
dat &lt;- read.csv("file.csv", header = TRUE, sep = ",")

# Từ SPSS/Stata (package haven)
dat &lt;- read_spss("file.sav")
dat &lt;- read_dta("file.dta")

# Dữ liệu có sẵn
data("mtcars")
data("iris")</pre></div>

<h4>Xem thông tin</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>View(dat)        # Xem dạng bảng
str(dat)         # Cấu trúc
dim(dat)         # Kích thước (dòng x cột)
names(dat)       # Tên cột
head(dat, 10)    # 10 dòng đầu
summary(dat)     # Thống kê mô tả</pre></div>

<h4>Lưu dữ liệu</h4>
<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre>save(dat, file = "data.rda")           # File R
write_xlsx(dat, "output.xlsx")         # Excel (writexl)
write_sav(dat, "output.sav")          # SPSS (haven)</pre></div>`
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

# TẠO BIẾN MỚI
mutate(dat, bmi = weight / height^2)
mutate(dat, level = case_when(
  score &lt; 5  ~ "Low",
  score &lt; 8  ~ "Medium",
  TRUE       ~ "High"
))

# TỔNG HỢP
summarise(dat, tb = mean(x, na.rm=TRUE), n = n())

# THEO NHÓM
dat %&gt;%
  group_by(nhom) %&gt;%
  summarise(tb = mean(x, na.rm=TRUE),
            tv = median(x, na.rm=TRUE))</pre></div>
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
        title: "gather, spread, unite, separate, gsub",
        icon: "🔀",
        html: `<div class="code-block"><div class="code-header"><span class="code-lang">R</span><button class="code-copy-btn">Copy</button></div>
<pre># GATHER – cột → dòng (wide → long)
gather(dat, key_col, value_col, col1, col2, ...)

# SPREAD – dòng → cột (long → wide)
spread(dat, key_col, value_col)

# UNITE – gộp nhiều cột thành 1
unite(dat, col = "new", col1, col2, sep = "_")

# SEPARATE – tách 1 cột thành nhiều
separate(dat, col, into = c("a","b"), sep = "-")

# GSUB – thay thế ký tự
gsub("old", "new", dat$col)
# VD: xóa "wk" → gsub("wk", "", dat$week)</pre></div>`
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
<pre># Cấu trúc: ggplot(data, aes(...)) + geom_...()

# Biểu đồ cột
ggplot(dat, aes(x = cut)) +
  geom_bar(fill = "steelblue") +
  labs(title = "Title", x = "X", y = "Y")

# Phân tán (scatter)
ggplot(dat, aes(x = col1, y = col2)) +
  geom_point(alpha = 0.5)

# Boxplot theo nhóm
ggplot(dat, aes(x = group, y = value)) +
  geom_boxplot(fill = "lightblue")

# Histogram
ggplot(dat, aes(x = price)) +
  geom_histogram(bins = 30)

# Tương tác: ggplotly(p)  # package plotly
# Tương quan: ggcorrplot(cor(dat))  # package ggcorrplot</pre></div>
<h4>Layers ggplot2</h4>
<table class="kv-table">
<tr><th>Layer</th><th>Chức năng</th></tr>
<tr><td><code>aes()</code></td><td>Xác định trục x, y</td></tr>
<tr><td><code>geom_*()</code></td><td>Loại biểu đồ</td></tr>
<tr><td><code>facet_wrap()</code></td><td>Chia nhỏ theo nhóm</td></tr>
<tr><td><code>labs()</code></td><td>Tiêu đề, nhãn</td></tr>
<tr><td><code>theme_*()</code></td><td>Hình nền</td></tr>
<tr><td><code>coord_*()</code></td><td>Hệ tọa độ</td></tr>
</table>`
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
anyNA(dat); sum(is.na(dat))
colSums(is.na(dat))

# ĐỒ THỊ (visdat, VIM)
vis_dat(dat); vis_miss(dat)
aggr(dat, numbers=TRUE, prop=FALSE, sortVars=TRUE)

# KIỂM ĐỊNH MCAR (naniar)
mcar_test(dat)  # H0: MCAR, H1: MAR

# XÓA
na.omit(dat)           # xóa dòng có NA
drop_na(dat, col1)     # xóa NA ở 1 cột

# THAY THẾ (package mice)
complete(mice(dat, method = "mean"))           # trung bình
complete(mice(dat, method = "sample"))         # ngẫu nhiên
complete(mice(dat, method = "norm.predict"))   # hồi quy
complete(mice(dat, method = "norm.nob"))       # hồi quy ngẫu nhiên
complete(mice(dat, method = "cart"))           # cây quyết định
complete(mice(dat, method = "rf"))             # rừng ngẫu nhiên</pre></div>`
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
LB &lt;- mean(dat$x) - 3*sd(dat$x)
UB &lt;- mean(dat$x) + 3*sd(dat$x)
filter(dat, x &lt; LB | x &gt; UB)

# HAMPEL (median ± 3*MAD)
LB &lt;- median(dat$x) - 3*mad(dat$x)
UB &lt;- median(dat$x) + 3*mad(dat$x)

# BOXPLOT
bp &lt;- boxplot(dat$x); bp$out

# KIỂM ĐỊNH (package outliers)
grubbs.test(dat$x, type = 10)  # 1 outlier, 1 phía
dixon.test(dat$x)              # mẫu nhỏ &lt; 25

# ROSNER (package EnvStats, mẫu &gt; 20)
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
bb &lt;- billboard %&gt;%
  gather(week, rank, wk1:wk76) %&gt;%
  drop_na(rank) %&gt;%
  arrange(rank)
bb$week &lt;- gsub("wk", "", bb$week)
bb &lt;- separate(bb, date.entered,
  into = c("year","month","day"), sep = "-")
bb &lt;- bb %&gt;% mutate(month = as.numeric(month),
  quarter = case_when(month&lt;=3~1, month&lt;=6~2,
    month&lt;=9~3, TRUE~4))
bb %&gt;% group_by(artist, track) %&gt;%
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
  }
};
