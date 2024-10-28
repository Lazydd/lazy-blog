# Git

仓库管理工具[下载地址](https://git-scm.com/)，我们选择下图红框的文件下载进行安装

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/202410281026384.png"></Image>

## 查看是否安装完成

```bash
git -v
```

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/202410281025205.png"></Image>

## Git 命令

### 更新 git

```bash
git update-git-for-windows
```

### git 冲突统一处理

:::danger 警告
此命令将当前所有存在冲突的文件统一选择**当前更改**
:::

```bash
git checkout --ours -- .
```

:::danger 警告
此命令将当前所有存在冲突的文件统一选择**传入更改**
:::

```bash
git checkout --theirs -- .
```

### git 拉取远程仓库代码

```bash
git rebase origin/<远程分支>
```

### git 取消变基

```bash
git rebase --abort
```

### git 修改之前的提交

:::tip 注意
下面命令中 `HEAD` 是你要更改的父级 `HEAD`
:::

#### 1. **进行分支变基**

:::tip 注意
下面命令中 `-i` 是 `--interactive` 的简写
:::

```bash
git rebase <HEAD> -i
```

#### 2. **将 commit 改成编辑状态**

:::tip 注意
下面命令中 `edit` 为提交文件内容和描述， `reword` 为仅提交描述，不提交文件内容
:::

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/202410281028271.png"></Image>

首先 `i` 进入编辑状态，然后将对应的 `commit` 前面的 `pick` 改成 `edit` ，最后 `:wq` 保存退出

#### 3. **提交修改文件**

```bash
git add <改动文件>
```

#### 4. **修改描述** <Badge type="tip" text="可选" />

```bash
git commit --amend
```

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/202410281028317.png"></Image>

`i` 进入编辑状态，然后修改红框内的描述，最后 `:wq` 保存退出，若描述前面为`#`开头，则需在开头加一个空格，即` #`

#### 5. **合并文件**

```bash
git rebase --continue
```

#### 6. **若有冲突，解决后重复[描述文件](/blog/utils/git#_4-修改描述)**

### git 设置代理

```bash
git config --global http.proxy <url>
git config --global https.proxy <url>
```

:::info 例如

```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890
```

:::

### git 取消代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy

```

### git 只给 Github 配置代理

```bash
git config --global http.http://github.com.proxy <url>
git config --global https.https://github.com.proxy <url>

```

### git 配置用户名和邮箱

```bash
# 全局配置用户名
git config --global user.name <用户名>
# 全局配置用户邮箱
git config --global user.email <邮箱>
```
