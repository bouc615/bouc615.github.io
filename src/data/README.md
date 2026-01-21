# 数据配置说明

## 简历数据 (resume.json)

简历数据存储在 `src/data/resume.json` 文件中，可以轻松编辑和维护。

### 数据结构

```json
{
  "experiences": [
    {
      "organization": "组织/公司名称",
      "role": "职位/角色",
      "period": "时间段",
      "location": "地点（可选）",
      "description": "描述"
    }
  ]
}
```

### 字段说明

- **organization**: 必填，组织或公司名称
- **role**: 必填，职位或角色
- **period**: 必填，时间段（如："2020.09 - 2024.06"）
- **location**: 可选，工作地点（如："广州 • 远程"）
- **description**: 必填，工作描述或成就

### 示例

```json
{
  "experiences": [
    {
      "organization": "广州中医药大学",
      "role": "医学信息工程",
      "period": "2020.09 - 2024.06",
      "location": "",
      "description": "主修医学信息工程，辅修计算机科学。"
    },
    {
      "organization": "某互联网公司",
      "role": "前端工程师",
      "period": "2024.07 - Present",
      "location": "广州 • 远程",
      "description": "负责业务系统的前端开发。"
    }
  ]
}
```

### 如何添加新经历

1. 打开 `src/data/resume.json`
2. 在 `experiences` 数组中添加新对象
3. 填写所有必填字段
4. 保存文件，页面会自动更新

### 排序

数组中的顺序就是页面显示的顺序，通常按时间倒序排列（最新的在前）。

### 注意事项

- JSON格式要求严格，注意逗号和引号
- 最后一个对象后面不要加逗号
- 使用UTF-8编码保存文件
- 如果不需要location字段，可以设为空字符串或省略
