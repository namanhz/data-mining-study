// R Autocomplete System for the code editor
const R_COMPLETIONS = [
  // === Base R ===
  { label: 'data.frame', detail: 'Tạo dataframe', insert: 'data.frame(\n  \n)' },
  { label: 'c', detail: 'Gộp giá trị', insert: 'c()' },
  { label: 'print', detail: 'In ra console', insert: 'print()' },
  { label: 'cat', detail: 'In text', insert: 'cat()' },
  { label: 'paste', detail: 'Nối chuỗi', insert: 'paste()' },
  { label: 'paste0', detail: 'Nối chuỗi (no sep)', insert: 'paste0()' },
  { label: 'length', detail: 'Số phần tử', insert: 'length()' },
  { label: 'nrow', detail: 'Số dòng', insert: 'nrow()' },
  { label: 'ncol', detail: 'Số cột', insert: 'ncol()' },
  { label: 'dim', detail: 'Kích thước (dòng x cột)', insert: 'dim()' },
  { label: 'str', detail: 'Cấu trúc dữ liệu', insert: 'str()' },
  { label: 'summary', detail: 'Thống kê mô tả', insert: 'summary()' },
  { label: 'head', detail: 'n dòng đầu', insert: 'head(, 10)' },
  { label: 'tail', detail: 'n dòng cuối', insert: 'tail(, 10)' },
  { label: 'View', detail: 'Xem dữ liệu', insert: 'View()' },
  { label: 'names', detail: 'Tên các cột', insert: 'names()' },
  { label: 'colnames', detail: 'Tên cột', insert: 'colnames()' },
  { label: 'rownames', detail: 'Tên dòng', insert: 'rownames()' },
  { label: 'class', detail: 'Kiểu dữ liệu', insert: 'class()' },
  { label: 'typeof', detail: 'Kiểu cơ bản', insert: 'typeof()' },
  // Math/Stat
  { label: 'mean', detail: 'Trung bình', insert: 'mean(, na.rm = TRUE)' },
  { label: 'median', detail: 'Trung vị', insert: 'median(, na.rm = TRUE)' },
  { label: 'sd', detail: 'Độ lệch chuẩn', insert: 'sd(, na.rm = TRUE)' },
  { label: 'var', detail: 'Phương sai', insert: 'var(, na.rm = TRUE)' },
  { label: 'sum', detail: 'Tổng', insert: 'sum(, na.rm = TRUE)' },
  { label: 'min', detail: 'Giá trị nhỏ nhất', insert: 'min(, na.rm = TRUE)' },
  { label: 'max', detail: 'Giá trị lớn nhất', insert: 'max(, na.rm = TRUE)' },
  { label: 'abs', detail: 'Giá trị tuyệt đối', insert: 'abs()' },
  { label: 'sqrt', detail: 'Căn bậc 2', insert: 'sqrt()' },
  { label: 'round', detail: 'Làm tròn', insert: 'round(, 2)' },
  { label: 'cor', detail: 'Tương quan', insert: 'cor()' },
  // Data types
  { label: 'as.numeric', detail: 'Chuyển sang số', insert: 'as.numeric()' },
  { label: 'as.character', detail: 'Chuyển sang ký tự', insert: 'as.character()' },
  { label: 'as.factor', detail: 'Chuyển sang factor', insert: 'as.factor()' },
  { label: 'as.logical', detail: 'Chuyển sang logic', insert: 'as.logical()' },
  { label: 'as.integer', detail: 'Chuyển sang integer', insert: 'as.integer()' },
  // Missing data
  { label: 'is.na', detail: 'Kiểm tra NA', insert: 'is.na()' },
  { label: 'anyNA', detail: 'Có NA không?', insert: 'anyNA()' },
  { label: 'na.omit', detail: 'Xóa dòng có NA', insert: 'na.omit()' },
  { label: 'colSums', detail: 'Tổng theo cột', insert: 'colSums(is.na())' },
  { label: 'complete.cases', detail: 'Dòng đầy đủ', insert: 'complete.cases()' },
  // Tables & IO
  { label: 'table', detail: 'Bảng tần số', insert: 'table()' },
  { label: 'prop.table', detail: 'Bảng tần suất', insert: 'prop.table()' },
  { label: 'addmargins', detail: 'Thêm tổng cho bảng', insert: 'addmargins()' },
  { label: 'data', detail: 'Đọc dữ liệu có sẵn', insert: 'data("")' },
  { label: 'library', detail: 'Gọi package', insert: 'library()' },
  { label: 'install.packages', detail: 'Cài package', insert: 'install.packages("")' },
  { label: 'read.csv', detail: 'Đọc file CSV', insert: 'read.csv("", header = TRUE)' },
  { label: 'write.csv', detail: 'Ghi file CSV', insert: 'write.csv(, "output.csv")' },
  // Plot
  { label: 'plot', detail: 'Vẽ đồ thị cơ bản', insert: 'plot()' },
  { label: 'hist', detail: 'Histogram', insert: 'hist()' },
  { label: 'boxplot', detail: 'Biểu đồ hộp', insert: 'boxplot()' },
  { label: 'barplot', detail: 'Biểu đồ cột', insert: 'barplot()' },
  // Other
  { label: 'which', detail: 'Vị trí thỏa ĐK', insert: 'which()' },
  { label: 'ifelse', detail: 'Điều kiện if-else', insert: 'ifelse(, , )' },
  { label: 'seq', detail: 'Dãy số', insert: 'seq(1, 10, by = 1)' },
  { label: 'rep', detail: 'Lặp lại', insert: 'rep(, times = )' },
  { label: 'sort', detail: 'Sắp xếp vector', insert: 'sort()' },
  { label: 'order', detail: 'Thứ tự sắp xếp', insert: 'order()' },
  { label: 'unique', detail: 'Giá trị duy nhất', insert: 'unique()' },
  { label: 'duplicated', detail: 'Giá trị trùng', insert: 'duplicated()' },
  { label: 'gsub', detail: 'Thay thế ký tự', insert: 'gsub("old", "new", )' },
  { label: 'lm', detail: 'Hồi quy tuyến tính', insert: 'lm( ~ , data = )' },
  { label: 'predict', detail: 'Dự đoán từ mô hình', insert: 'predict(, .)' },
  // === dplyr ===
  { label: 'select', detail: 'dplyr: chọn cột', insert: 'select(, )' },
  { label: 'filter', detail: 'dplyr: lọc dòng', insert: 'filter(, )' },
  { label: 'mutate', detail: 'dplyr: tạo biến mới', insert: 'mutate(, )' },
  { label: 'summarise', detail: 'dplyr: tổng hợp', insert: 'summarise(, )' },
  { label: 'summarize', detail: 'dplyr: tổng hợp', insert: 'summarize(, )' },
  { label: 'arrange', detail: 'dplyr: sắp xếp', insert: 'arrange(, )' },
  { label: 'group_by', detail: 'dplyr: nhóm theo', insert: 'group_by(, )' },
  { label: 'rename', detail: 'dplyr: đổi tên cột', insert: 'rename(, "new" = "old")' },
  { label: 'distinct', detail: 'dplyr: xóa trùng', insert: 'distinct(, .keep_all = TRUE)' },
  { label: 'slice', detail: 'dplyr: chọn dòng', insert: 'slice(, )' },
  { label: 'slice_max', detail: 'dplyr: n lớn nhất', insert: 'slice_max(, , n = )' },
  { label: 'slice_min', detail: 'dplyr: n nhỏ nhất', insert: 'slice_min(, , n = )' },
  { label: 'sample_n', detail: 'dplyr: lấy n mẫu', insert: 'sample_n(, )' },
  { label: 'sample_frac', detail: 'dplyr: lấy % mẫu', insert: 'sample_frac(, 0.1)' },
  { label: 'top_n', detail: 'dplyr: n lớn nhất', insert: 'top_n(, , )' },
  { label: 'case_when', detail: 'dplyr: nhiều ĐK', insert: 'case_when(\n  ~ ,\n  TRUE ~ \n)' },
  { label: 'across', detail: 'dplyr: nhiều cột', insert: 'across(c(), list())' },
  { label: 'everything', detail: 'dplyr: tất cả cột', insert: 'everything()' },
  { label: 'n', detail: 'dplyr: đếm', insert: 'n()' },
  { label: 'desc', detail: 'dplyr: giảm dần', insert: 'desc()' },
  { label: 'percent_rank', detail: 'dplyr: phân vị', insert: 'percent_rank()' },
  { label: 'transmute', detail: 'dplyr: mutate + chỉ giữ mới', insert: 'transmute(, )' },
  // dplyr joins
  { label: 'inner_join', detail: 'dplyr: join chung', insert: 'inner_join(, , by = "")' },
  { label: 'left_join', detail: 'dplyr: join trái', insert: 'left_join(, , by = "")' },
  { label: 'right_join', detail: 'dplyr: join phải', insert: 'right_join(, , by = "")' },
  { label: 'full_join', detail: 'dplyr: join đầy đủ', insert: 'full_join(, , by = "")' },
  { label: 'bind_rows', detail: 'dplyr: nối dòng', insert: 'bind_rows(, )' },
  { label: 'bind_cols', detail: 'dplyr: nối cột', insert: 'bind_cols(, )' },
  { label: 'intersect', detail: 'Dòng chung', insert: 'intersect(, )' },
  { label: 'union', detail: 'Tất cả dòng', insert: 'union(, )' },
  { label: 'setdiff', detail: 'Dòng khác biệt', insert: 'setdiff(, )' },
  // === tidyr ===
  { label: 'gather', detail: 'tidyr: cột→dòng', insert: 'gather(, key, value, )' },
  { label: 'spread', detail: 'tidyr: dòng→cột', insert: 'spread(, , )' },
  { label: 'pivot_longer', detail: 'tidyr: wide→long', insert: 'pivot_longer(, cols = , names_to = "", values_to = "")' },
  { label: 'pivot_wider', detail: 'tidyr: long→wide', insert: 'pivot_wider(, names_from = , values_from = )' },
  { label: 'separate', detail: 'tidyr: tách cột', insert: 'separate(, , into = c("", ""), sep = "")' },
  { label: 'unite', detail: 'tidyr: gộp cột', insert: 'unite(, col = "", , , sep = "_")' },
  { label: 'drop_na', detail: 'tidyr: xóa NA', insert: 'drop_na()' },
  // === ggplot2 ===
  { label: 'ggplot', detail: 'ggplot2: khởi tạo', insert: 'ggplot(, aes(x = , y = ))' },
  { label: 'aes', detail: 'ggplot2: aesthetics', insert: 'aes(x = , y = )' },
  { label: 'geom_bar', detail: 'ggplot2: cột', insert: 'geom_bar()' },
  { label: 'geom_col', detail: 'ggplot2: cột (giá trị)', insert: 'geom_col()' },
  { label: 'geom_point', detail: 'ggplot2: phân tán', insert: 'geom_point()' },
  { label: 'geom_line', detail: 'ggplot2: đường', insert: 'geom_line()' },
  { label: 'geom_histogram', detail: 'ggplot2: histogram', insert: 'geom_histogram(bins = 30)' },
  { label: 'geom_boxplot', detail: 'ggplot2: hộp', insert: 'geom_boxplot()' },
  { label: 'geom_smooth', detail: 'ggplot2: đường trend', insert: 'geom_smooth(method = "lm")' },
  { label: 'labs', detail: 'ggplot2: nhãn', insert: 'labs(title = "", x = "", y = "")' },
  { label: 'theme_minimal', detail: 'ggplot2: theme', insert: 'theme_minimal()' },
  { label: 'theme_bw', detail: 'ggplot2: theme B&W', insert: 'theme_bw()' },
  { label: 'facet_wrap', detail: 'ggplot2: chia nhỏ', insert: 'facet_wrap(~ )' },
  { label: 'coord_flip', detail: 'ggplot2: xoay', insert: 'coord_flip()' },
  // Pipe
  { label: '%>%', detail: 'Pipe operator', insert: '%>%\n  ' },
];

// ============ AUTOCOMPLETE UI ============
function initAutocomplete(textarea) {
  const wrap = textarea.closest('.r-editor-wrap');
  let dropdown = wrap.querySelector('.autocomplete-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.className = 'autocomplete-dropdown';
    dropdown.style.display = 'none';
    wrap.style.position = 'relative';
    wrap.appendChild(dropdown);
  }

  let selectedIdx = 0;
  let currentMatches = [];

  textarea.addEventListener('input', () => {
    const word = getCurrentWord(textarea);
    if (word.length < 2) { dropdown.style.display = 'none'; return; }

    currentMatches = R_COMPLETIONS.filter(c =>
      c.label.toLowerCase().startsWith(word.toLowerCase())
    ).slice(0, 8);

    if (currentMatches.length === 0) { dropdown.style.display = 'none'; return; }

    selectedIdx = 0;
    renderDropdown(dropdown, currentMatches, selectedIdx);
    positionDropdown(textarea, dropdown);
    dropdown.style.display = 'block';
  });

  textarea.addEventListener('keydown', (e) => {
    if (dropdown.style.display === 'none') return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIdx = Math.min(selectedIdx + 1, currentMatches.length - 1);
      renderDropdown(dropdown, currentMatches, selectedIdx);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIdx = Math.max(selectedIdx - 1, 0);
      renderDropdown(dropdown, currentMatches, selectedIdx);
    } else if (e.key === 'Enter' && currentMatches.length > 0) {
      e.preventDefault();
      applyCompletion(textarea, currentMatches[selectedIdx]);
      dropdown.style.display = 'none';
    } else if (e.key === 'Escape') {
      dropdown.style.display = 'none';
    }
  });

  textarea.addEventListener('blur', () => {
    setTimeout(() => { dropdown.style.display = 'none'; }, 200);
  });

  // Click on item
  dropdown.addEventListener('mousedown', (e) => {
    const item = e.target.closest('.ac-item');
    if (item) {
      const idx = parseInt(item.dataset.idx);
      applyCompletion(textarea, currentMatches[idx]);
      dropdown.style.display = 'none';
    }
  });
}

function getCurrentWord(textarea) {
  const pos = textarea.selectionStart;
  const text = textarea.value.substring(0, pos);
  const match = text.match(/[a-zA-Z_.%][a-zA-Z0-9_.%>]*$/);
  return match ? match[0] : '';
}

function applyCompletion(textarea, completion) {
  const pos = textarea.selectionStart;
  const text = textarea.value;
  const word = getCurrentWord(textarea);
  const before = text.substring(0, pos - word.length);
  const after = text.substring(pos);
  textarea.value = before + completion.insert + after;

  // Position cursor inside parentheses if applicable
  const parenIdx = completion.insert.indexOf('(');
  if (parenIdx >= 0) {
    const newPos = before.length + parenIdx + 1;
    textarea.setSelectionRange(newPos, newPos);
  } else {
    const newPos = before.length + completion.insert.length;
    textarea.setSelectionRange(newPos, newPos);
  }
  textarea.focus();
}

function renderDropdown(dropdown, matches, selectedIdx) {
  dropdown.innerHTML = matches.map((m, i) =>
    `<div class="ac-item${i === selectedIdx ? ' selected' : ''}" data-idx="${i}">
      <span class="ac-label">${m.label}</span>
      <span class="ac-detail">${m.detail}</span>
    </div>`
  ).join('');
}

function positionDropdown(textarea, dropdown) {
  // Position below the textarea cursor approximately
  const lineHeight = 22;
  const pos = textarea.selectionStart;
  const textBefore = textarea.value.substring(0, pos);
  const lines = textBefore.split('\n');
  const currentLine = lines.length;
  const top = Math.min(currentLine * lineHeight + 8, textarea.offsetHeight);

  dropdown.style.top = (textarea.offsetTop + top) + 'px';
  dropdown.style.left = '16px';
}

// Initialize autocomplete on all editors when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.r-editor-textarea').forEach(ta => {
      initAutocomplete(ta);
    });
  }, 500);
});
