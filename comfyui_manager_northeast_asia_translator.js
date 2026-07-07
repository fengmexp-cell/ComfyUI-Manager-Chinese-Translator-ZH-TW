// =====================================================================
// 🚀 專案名稱：ComfyUI-Manager 東北亞多語直覺引擎 Pro Max v4.0
// 🌐 語系支援：繁體中文 / 簡體中文 / 日本語 / 한국어 (自動識別切換)
// 🛠️ 實務監製：峰哥 (Feng) 
// 💻 技術架構：Gemini AI / 小胖子
// 📢 精神宗旨：專治各種介面不服，一鍵開源大家爽！
// =====================================================================
/******************************************************************
 * v4.0 更新：
 * 1. 完美融合簡體實戰版詞庫。
 * 2. 修正動態公告攔截，利用 ^\s* 容許開頭空格，並用 [\s\S]* 吞掉英文尾巴。
 * 3. 維持最乾淨的精準、正則、包含三大步驟，不影響原本網頁排版。
 ******************************************************************/
(function() {
    // --- 偵測語言：zh-CN開頭為簡中，ja為日文，ko為韓文，其餘預設繁中 ---
    const lang = navigator.language.startsWith('zh-CN') ? 'zh_cn' :
                 navigator.language.startsWith('ja')    ? 'ja'    :
                 navigator.language.startsWith('ko')    ? 'ko'    : 'zh_tw';

    // --- 1. 核心精準匹配詞庫 ---
    const maps = {
        zh_tw: {
            "Share": "分享成果",
            "Install Custom Nodes": "安裝新插件 (擴充功能)",
            "Install Missing Custom Nodes": "安裝缺少的節點",
            "Custom Nodes In Workflow": "目前工作流用的插件",
            "Update All": "全部更新到最新",
            "Fetch Updates": "檢查有沒有更新",
            "Install Models": "下載 AI 模型",
            "Update ComfyUI": "更新 ComfyUI 主程式",
            "Manager": "管理器主頁",
            "Custom Nodes Manager": "插件大管家",
            "Model Manager": "模型管理員",
            "Restart": "立即重新啟動",
            "Alternative Download Service": "換個伺服器下載 (鏡像源)",
            "Switch ComfyUI": "切換主程式版本",
            "Workflow Gallery": "工作流展示廳",
            "Community Manual": "社群說明書",
            "Nodes Info": "節點詳細資料",
            "Used In Workflow": "工作流正在用",
            "Check Update": "檢查更新",
            "Check Missing": "檢查缺失",
            "Install via Git URL": "用 Git 網址安裝",
            "Filter": "篩選搜尋",
            "Search": "搜尋",
            "Description": "說明",
            "Version": "版本",
            "Action": "操作",
            "Author": "作者",
            "Last Update": "最後更新",
            "Try update": "嘗試更新",
            "Install": "安裝",
            "Uninstall": "解除安裝",
            "Update": "更新",
            "Size": "大小",
            "Type": "類型",
            "Base": "基底模型",
            "Save Path": "儲存路徑",
            "No Results": "查無結果",
            "EXPERIMENTAL": "不懂別亂點",
            "Snapshot Manager": "快照備份管理",
            "Install PIP packages": "安裝 Python 套件",
            "Please enter the URL of the Git repository to install": "請貼上要安裝的 Git 倉庫網址",
            "Confirm": "確定",
            "OK": "好",
            "Close": "關閉",
            "Cancel": "取消",
            "ID": "編號",
            "Title": "名稱",
            "Nodes": "節點數",
            "Failed to load": "載入失敗",
            "Failed to load graph": "載入子圖藍圖失敗",
            "Please enumerate the pip packages to be installed. Example: insightface opencv-python-headless>=4.1.1": "請輸入要安裝的 pip 套件名稱，例如：insightface opencv-python-headless>=4.1.1",
            "Example: insightface opencv-python-headless>=4.1.1": "範例：insightface opencv-python-headless>=4.1.1",
        },
        zh_cn: {
            "Share": "分享成果",
            "Install Custom Nodes": "安装新插件 (自定义节点)",
            "Install Missing Custom Nodes": "缺啥补啥 (自动修复)",
            "Custom Nodes In Workflow": "当前工作流插件",
            "Update All": "全部更新到最新",
            "Fetch Updates": "看有没有新东西",
            "Install Models": "下载 AI 模型",
            "Update ComfyUI": "更新主程序",
            "Manager": "管理器主页",
            "Custom Nodes Manager": "插件大管家",
            "Model Manager": "模型管理员",
            "Restart": "立即重启",
            "Alternative Download Service": "换个服务器下载 (镜像源)",
            "Switch ComfyUI": "切换主程序版本",
            "Community Manual": "大家写的说明书",
            "Nodes Info": "节点规格查询",
            "Workflow Gallery": "大家的工作流馆",
            "Used In Workflow": "正在用的插件",
            "Check Update": "检查谁有更新",
            "Check Missing": "找缺少的节点",
            "Install via Git URL": "用网址直接装",
            "Filter": "过滤搜索",
            "Search": "找模型",
            "Nodes": "节点数量",
            "Author": "开发者",
            "Last Update": "最后更新",
            "Try update": "尝试更新",
            "Install": "点我安装",
            "Uninstall": "卸载",
            "Update": "更新",
            "Size": "文件大小",
            "Type": "模型种类",
            "Base": "底层架构",
            "Save Path": "文件存哪儿",
            "No Results": "没找到结果",
            "ID": "编号",
            "Title": "名称",
            "Description": "说明",
            "Version": "版本",
            "Action": "操作",
            "custom nodes": "自定义节点",
            "DB": "数据库模式",
            "Channel": "切换 稳定/开发 版",
            "Preview": "预览图显示模式",
            "Component": "组件版本控管",
            "Preview method": "预览图显示模式",
            "Use workflow version": "照着工作流走",
            "Use higher version": "有新版就用新版",
            "Use my version": "坚持用我的版本",
            "EXPERIMENTAL": "【实验区】不懂别乱点",
            "Snapshot Manager": "系统备份与还原",
            "Install PIP packages": "安装 Python 依赖组件",
            "Please enter the URL of the Git repository to install": "请粘贴要安装的插件网址 (Git URL)",
            "Confirm": "确定",
            "OK": "好",
            "Close": "关闭",
            "Cancel": "取消",
            "Failed to load": "加载失败",
            "Failed to load graph": "加载子图蓝图失败",
            "Please enumerate the pip packages to be installed. Example: insightface opencv-python-headless>=4.1.1": "请输入要安装的 pip 包名称，例如：insightface opencv-python-headless>=4.1.1",
            "Example: insightface opencv-python-headless>=4.1.1": "示例：insightface opencv-python-headless>=4.1.1",
        },
        ja: {
            "Share": "成果を共有",
            "Install Custom Nodes": "カスタムノードをインストール (拡張機能)",
            "Install Missing Custom Nodes": "不足しているノードをインストール",
            "Custom Nodes In Workflow": "現在のワークフローで使用中のプラグイン",
            "Update All": "全て最新版に更新",
            "Fetch Updates": "更新を確認",
            "Install Models": "AIモデルをダウンロード",
            "Update ComfyUI": "ComfyUI本体を更新",
            "Manager": "マネージャーホーム",
            "Custom Nodes Manager": "プラグイン管理人",
            "Model Manager": "モデル管理",
            "Restart": "今すぐ再起動",
            "Workflow Gallery": "ワークフローギャラリー",
            "Community Manual": "コミュニティマニュアル",
            "Nodes Info": "ノード詳細情報",
            "Used In Workflow": "ワークフローで使用中",
            "Check Update": "更新を確認",
            "Check Missing": "不足を確認",
            "Install via Git URL": "Git URLでインストール",
            "Filter": "フィルター検索",
            "Search": "検索",
            "Description": "説明",
            "Version": "バージョン",
            "Action": "操作",
            "Author": "作者",
            "Last Update": "最終更新",
            "Try update": "更新を試す",
            "Install": "インストール",
            "Uninstall": "アンインストール",
            "Update": "更新",
            "Size": "サイズ",
            "Type": "タイプ",
            "Base": "ベースモデル",
            "Save Path": "保存パス",
            "No Results": "結果なし",
            "EXPERIMENTAL": "素人は触るな",
            "Snapshot Manager": "スナップショット管理",
            "Install PIP packages": "Pythonパッケージをインストール",
            "Please enter the URL of the Git repository to install": "インストールするGitリポジトリのURLを貼り付けてください",
            "Confirm": "確定",
            "OK": "OK",
            "Close": "閉じる",
            "Cancel": "キャンセル",
            "ID": "ID",
            "Title": "名前",
            "Nodes": "ノード数",
            "Failed to load": "読み込み失敗",
            "Failed to load graph": "サブグラフの読み込みに失敗",
            "Please enumerate the pip packages to be installed. Example: insightface opencv-python-headless>=4.1.1": "インストールするpipパッケージを入力してください。例：insightface opencv-python-headless>=4.1.1",
            "Example: insightface opencv-python-headless>=4.1.1": "例：insightface opencv-python-headless>=4.1.1",
        },
        ko: {
            "Share": "결과 공유",
            "Install Custom Nodes": "커스텀 노드 설치 (확장 기능)",
            "Install Missing Custom Nodes": "누락된 노드 설치",
            "Custom Nodes In Workflow": "현재 워크플로우에서 사용하는 플러그인",
            "Update All": "모두 최신 버전으로 업데이트",
            "Fetch Updates": "업데이트 확인",
            "Install Models": "AI 모델 다운로드",
            "Update ComfyUI": "ComfyUI 본체 업데이트",
            "Manager": "매니저 홈",
            "Custom Nodes Manager": "플러그인 관리자",
            "Model Manager": "모델 관리자",
            "Restart": "즉시 재시작",
            "Workflow Gallery": "워크플로우 갤러리",
            "Community Manual": "커뮤니티 매뉴얼",
            "Nodes Info": "노드 상세 정보",
            "Used In Workflow": "워크플로우에서 사용 중",
            "Check Update": "업데이트 확인",
            "Check Missing": "누락 확인",
            "Install via Git URL": "Git URL로 설치",
            "Filter": "필터 검색",
            "Search": "검색",
            "Description": "설명",
            "Version": "버전",
            "Action": "작업",
            "Author": "작성자",
            "Last Update": "마지막 업데이트",
            "Try update": "업데이트 시도",
            "Install": "설치",
            "Uninstall": "제거",
            "Update": "업데이트",
            "Size": "크기",
            "Type": "유형",
            "Base": "베이스 모델",
            "Save Path": "저장 경로",
            "No Results": "결과 없음",
            "EXPERIMENTAL": "모르면 건들지 마세요",
            "Snapshot Manager": "스냅샷 관리",
            "Install PIP packages": "Python 패키지 설치",
            "Please enter the URL of the Git repository to install": "설치할 Git 저장소 URL을 붙여넣으세요",
            "Confirm": "확인",
            "OK": "확인",
            "Close": "닫기",
            "Cancel": "취소",
            "ID": "ID",
            "Title": "이름",
            "Nodes": "노드 수",
            "Failed to load": "로드 실패",
            "Failed to load graph": "서브 그래프 로드 실패",
            "Please enumerate the pip packages to be installed. Example: insightface opencv-python-headless>=4.1.1": "설치할 pip 패키지 이름을 입력하세요. 예: insightface opencv-python-headless>=4.1.1",
            "Example: insightface opencv-python-headless>=4.1.1": "예: insightface opencv-python-headless>=4.1.1",
        }
    };

    const current_map = maps[lang];

    // --- 2. 核心動態正則規則（包含峰哥最厲害的空四格與公告通配規則） ---
    const regex_rules = [
        { reg: /^Update \((\d+)\)$/, zh_tw: '更新 ($1)', zh_cn: '更新 ($1)', ja: '更新 ($1)', ko: '업데이트 ($1)' },
        { reg: /^Install (\d+)\/(\d+)$/, zh_tw: '安裝 $1/$2', zh_cn: '安装 $1/$2', ja: 'インストール $1/$2', ko: '설치 $1/$2' },
        { reg: /^(\d+) nodes$/, zh_tw: '$1 個節點', zh_cn: '$1 个节点', ja: '$1 ノード', ko: '$1 노드' },
        { reg: /^(\d+) models$/, zh_tw: '$1 個模型', zh_cn: '$1 个模型', ja: '$1 モデル', ko: '$1 모델' },
        { reg: /^Failed to load graph x(\d+)$/, zh_tw: '載入子圖藍圖失敗 x$1', zh_cn: '加载子图蓝图失败 x$1', ja: 'サブグラフの読み込みに失敗 x$1', ko: '서브 그래프 로드 실패 x$1' },
        
        // 🚨 峰哥實戰微調：針對 [security] 內含換行與前方四個空格，發動正則全面狙擊！
        { 
            reg: /^\s*\[security\] Compromised litellm[\s\S]*$/, 
            zh_tw: '🚨【資安緊急通報】litellm 套件遭供應鏈惡意代碼攻擊，請立即更新管理器！', 
            zh_cn: '🚨【资安紧急通报】litellm 套件遭供应链恶意代码攻击，请立即更新管理器！', 
            ja: '🚨【緊急セキュリティ警告】litellm パッケージがサプライチェーン攻撃を受けました。マネージャーを最新版に更新してください！', 
            ko: '🚨【긴급 보안 경고】litellm 패키지가 공급망 공격을 받았습니다. 매니저를 즉시 최신 버전으로 업데이트하세요!' 
        },
        // 📢 針對版本更新公告同樣包攬後面英文尾巴
        { 
            reg: /^\s*ComfyUI v0\.18\.2 is released[\s\S]*$/, 
            zh_tw: '🎉 ComfyUI v0.18.2 正式版本發布！', 
            zh_cn: '🎉 ComfyUI v0.18.2 正式版本发布！', 
            ja: '🎉 ComfyUI v0.18.2 がリリースされました！', 
            ko: '🎉 ComfyUI v0.18.2 버전이 릴리즈되었습니다!' 
        }
    ];

    // --- 3. 包含式模糊匹配詞庫 ---
    const includes_maps = {
        zh_tw: [
            ["Workflow Gallery", "工作流展示廳"],
            ["Community Manual", "社群說明書"],
            ["Failed to load graph", "載入子圖藍圖失敗"],
            ["Failed to load", "載入失敗"],
            ["Please enumerate the pip packages", "請輸入要安裝的 pip 套件名稱"],
            ["Keywords: security", "關鍵字：安全防護"],
            ["Issue News:", "已知問題與公告："],
            ["Features/Updates News:", "功能與更新資訊："]
        ],
        zh_cn: [
            ["Workflow Gallery", "大家的工作流馆"],
            ["Community Manual", "大家写的说明书"],
            ["Failed to load graph", "加载子图蓝图失败"],
            ["Failed to load", "加载失败"],
            ["Please enumerate the pip packages", "请输入要安装的 pip 包名称"],
            ["Keywords: security", "关键字：安全防护"],
            ["Issue News:", "已知问题与公告："],
            ["Features/Updates News:", "功能与更新资讯："]
        ],
        ja: [
            ["Workflow Gallery", "ワークフローギャラリー"],
            ["Community Manual", "コミュニティマニュアル"],
            ["Failed to load graph", "サブグラフの読み込みに失敗"],
            ["Failed to load", "読み込み失敗"],
            ["Please enumerate the pip packages", "インストールするpipパッケージを入力してください"],
            ["Keywords: security", "キーワード：セキュリティ安全"],
            ["Issue News:", "不具合報告・お知らせ："],
            ["Features/Updates News:", "機能・アップデート情報："]
        ],
        ko: [
            ["Workflow Gallery", "워크플로우 갤러리"],
            ["Community Manual", "커뮤니티 매뉴얼"],
            ["Failed to load graph", "서브 그래프 로드 실패"],
            ["Failed to load", "로드 실패"],
            ["Please enumerate the pip packages", "설치할 pip 패키지 이름을 입력하세요"],
            ["Keywords: security", "키워드: 보안 안전"],
            ["Issue News:", "이슈 및 공지사항:"],
            ["Features/Updates News:", "기능 및 업데이트 소식:"]
        ]
    };
    const includes_map = includes_maps[lang];

    function debounce(fn, delay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        }
    }

    // 🌟 原汁原味的三大步驟核心函數，最穩、排版最安全！
    function translateText(txt) {
        txt = txt.trim();
        if (!txt) return txt;
        
        // 1. 精準匹配
        if (current_map[txt]) return current_map[txt];
        
        // 2. 正則動態匹配
        for (const rule of regex_rules) {
            if (rule.reg.test(txt)) return txt.replace(rule.reg, rule[lang]);
        }
        
        // 3. 包含式模糊匹配
        for (const [key, val] of includes_map) {
            if (txt.includes(key)) return txt.replace(key, val);
        }
        return txt;
    }

    function translateNode(root) {
        root.querySelectorAll('*').forEach(el => {
            if (['SCRIPT', 'STYLE', 'TEXTAREA'].includes(el.tagName)) return;
            for (const node of el.childNodes) {
                if (node.nodeType === 3) {
                    const newTxt = translateText(node.nodeValue);
                    if (newTxt !== node.nodeValue) node.nodeValue = newTxt;
                }
            }
            if (el.placeholder) el.placeholder = translateText(el.placeholder);
            if (el.title) el.title = translateText(el.title);
            if (el.tagName === 'OPTION' && el.textContent) {
                el.textContent = translateText(el.textContent);
            }
        });
    }

    const runTranslate = debounce(() => {
        translateNode(document.body);
    }, 100);

    const observer = new MutationObserver(runTranslate);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['placeholder', 'title']
    });

    setTimeout(runTranslate, 800);

    // 霸氣的彩色 Log 訊息
    console.log("%c==================================================", "color:#FF6D00");
    console.log(`%c🔥 峰哥多語引擎 Pro Max v4.0：東北亞四語全自動版！當前：${lang}`, "color:#FF6D00; font-size:14px; font-weight:bold;");
    console.log("%c🛠️ 實務監製：峰哥 (Feng) | 核心架構：繁中 / 簡中 / 日本語 / 한국어", "color:#FF6D00");
    console.log("%c📢 專治各種介面不服，一鍵開源大家爽！", "color:#FF6D00");
    console.log("%c==================================================", "color:#FF6D00");
})();
