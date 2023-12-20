// 是否开启代码折叠
var enableCodeCollapse = true;

// 代码块最大显示行数
var maxDisplayLines = 20;

// 是否开启代码复制
var enableCodeCopy = true;

// 是否显示编程语言
var enableCodeLanguage = true;

var codeLang = {
  abap: "ABAP",
  apl: "APL",
  asciiarmor: "ASCII Armor",
  asn1: "ASN.1",
  asp: "ASP",
  assembly: "Assembly",
  bash: "Bash",
  basic: "BASIC",
  c: "C",
  csharp: "C#",
  cpp: "C++",
  cassandra: "Cassandra",
  ceylon: "Ceylon",
  clike: "C-like",
  clojure: "Clojure",
  cmake: "CMake",
  cobol: "COBOL",
  coffeescript: "CoffeeScript",
  commonlisp: "Common Lisp",
  cql: "CQL",
  crystal: "Crystal",
  css: "CSS",
  cypher: "Cypher",
  cython: "Cython",
  d: "D",
  dart: "Dart",
  diff: "Diff",
  django: "Django",
  dockerfile: "Dockerfile",
  dtd: "DTD",
  dylan: "Dylan",
  ejs: "EJS",
  elixir: "Elixir",
  elm: "Elm",
  embeddedjs: "EmbeddedJS",
  erb: "ERB",
  erlang: "Erlang",
  fsharp: "F#",
  flow: "Flow",
  forth: "Forth",
  fortran: "Fortran",
  gas: "Gas",
  gfm: "GFM",
  gherkin: "Gherkin",
  glsl: "GLSL",
  go: "Go",
  groovy: "Groovy",
  handlebars: "Handlebars",
  haskell: "Haskell",
  haxe: "Haxe",
  hive: "Hive",
  htaccess: "htaccess",
  html: "HTML",
  http: "HTTP",
  hxml: "HXML",
  idl: "IDL",
  ini: "INI",
  jade: "Jade",
  java: "Java",
  javascript: "JavaScript",
  jinja2: "Jinja2",
  js: "JavaScript",
  json: "JSON",
  jsp: "JSP",
  jsx: "JSX",
  julia: "Julia",
  kotlin: "Kotlin",
  latex: "LaTeX",
  less: "Less",
  lisp: "Lisp",
  livescript: "LiveScript",
  lua: "Lua",
  makefile: "Makefile",
  mariadb: "MariaDB",
  markdown: "Markdown",
  mathematica: "Mathematica",
  matlab: "MATLAB",
  mbox: "Mbox",
  mermaid: "Mermaid",
  mssql: "MSSQL",
  mysql: "MySQL",
  nginx: "Nginx",
  nim: "Nim",
  nsis: "NSIS",
  objc: "Objective-C",
  ocaml: "OCaml",
  octave: "Octave",
  oz: "Oz",
  pascal: "Pascal",
  pegjs: "PEG.js",
  perl: "Perl",
  perl6: "Perl6",
  pgp: "PGP",
  php: "PHP",
  phphtml: "PHP+HTML",
  plsql: "PL/SQL",
  postgresql: "PostgreSQL",
  powershell: "PowerShell",
  properties: "Properties",
  protobuf: "Protocol Buffers",
  pseudocode: "Pseudocode",
  pug: "Pug",
  python: "Python",
  q: "Q",
  r: "R",
  react: "React",
  restructuredtext: "reStructuredText",
  rst: "RST",
  ruby: "Ruby",
  rust: "Rust",
  sas: "SAS",
  scala: "Scala",
  scheme: "Scheme",
  scss: "SCSS",
  sequence: "Sequence",
  sh: "Shell",
  shell: "Shell",
  smalltalk: "Smalltalk",
  solidity: "Solidity",
  sparql: "SPARQL",
  spreadsheet: "Spreadsheet",
  sql: "SQL",
  sqlite: "SQLite",
  squirrel: "Squirrel",
  stata: "Stata",
  stylus: "Stylus",
  svelte: "Svelte",
  swift: "Swift",
  systemverilog: "SystemVerilog",
  tcl: "Tcl",
  tex: "TeX",
  tiddlywiki: "TiddlyWiki",
  tikiwiki: "Tiki Wiki",
  toml: "TOML",
  ts: "TypeScript",
  tsx: "TSX",
  turtle: "Turtle",
  twig: "Twig",
  typescript: "TypeScript",
  v: "V",
  vb: "VB",
  vbscript: "VBScript",
  velocity: "Velocity",
  verilog: "Verilog",
  vhdl: "VHDL",
  visualbasic: "Visual Basic",
  vue: "Vue",
  webidl: "Web IDL",
  wiki: "Wiki",
  xaml: "XAML",
  xml: "XML",
  xmldtd: "XML DTD",
  xquery: "XQuery",
  yacas: "Yacas",
  yaml: "YAML",
  yara: "YARA",
};

// 代码语言格式化
function getLanguage(lang) {
  var lang_lower = lang.toLowerCase();
  // 将代码语言转换为标准形式
  return lang_lower in codeLang ? codeLang[lang_lower] : lang;
}

// 获取唯一 ID
function getUuiD() {
  // 生成一个唯一的 ID
  return Math.random().toString(36).substring(2, 8) + Date.now().toString(36);
}

// 文本复制
function copyText(text) {
  // 使用 Clipboard API 将文本复制到剪贴板
  navigator.clipboard.writeText(text).then(function () {
    console.log('代码复制成功');
  }).catch(function (err) {
    console.error('代码复制失败', err);
  });
}

// 添加复制按钮
function addCopyButton(wrapper) {
  // 如果禁用了代码复制，直接返回
  if (!enableCodeCopy) {
    return;
  }

  // 创建复制按钮
  var copyBtn = document.createElement('i');
  copyBtn.className = 'iconfont icon-clipboard copy-code copy-right';
  copyBtn.addEventListener('click', function () {
    // 获取代码块内容
    var codeContent = wrapper.lastChild;
    console.log(codeContent);
    // 复制文本到剪贴板
    copyText(codeContent.innerText);
    // 先隐藏原本的复制按钮
    copyBtn.style.display = 'none';
    // 插入一个检查图标作为成功提示
    var successIcon = document.createElement('i');
    successIcon.className = 'iconfont icon-check copy-right';
    wrapper.prepend(successIcon);
    setTimeout(function () {
      // 移除成功图标
      successIcon.remove();
      // 恢复复制按钮显示
      copyBtn.style.display = 'block';
    }, 1000);
  });
  // 将复制按钮添加到代码块前面
  wrapper.prepend(copyBtn);
}

// 代码折叠
function addCodeCollapse(wrapper) {
  // 获取代码块的语言类别
  var lang = wrapper.firstChild.firstChild.classList[1];
  // 生成唯一的折叠标识符
  var id = `collapse-${getUuiD()}`;
  // 是否显示折叠按钮
  var btn = enableCodeCollapse ? `<i class="iconfont icon-regular-down" type="button" data-toggle="collapse" data-target="#${id}"></i>` : '';
  // 是否显示编程语言标签
  var span = enableCodeLanguage ? `<span class="code-lang">${getLanguage(lang)}</span>` : '';
  // 判断是否是大型代码块且开启了折叠
  var isLargeCode = wrapper.innerText.split('\n').length > (maxDisplayLines + 1);
  // 设置默认的折叠样式
  var defaultCollapseClass = isLargeCode && enableCodeCollapse ? 'collapse' : 'collapse show';
  // 创建包含折叠内容的 div
  var div = `<div class="${defaultCollapseClass}" id="${id}">${wrapper.innerHTML}</div>`;
  // 将折叠按钮、语言标签、折叠内容添加到代码块容器中
  wrapper.innerHTML = btn + span + div;

  // 如果是大型代码块且开启了折叠
  if (isLargeCode && enableCodeCollapse) {
    // 获取折叠按钮
    var collapseButton = wrapper.querySelector(".icon-regular-down");
    // 添加旋转效果
    collapseButton.classList.add('rotate');
    // 点击折叠按钮时，移除旋转效果
    collapseButton.addEventListener('click', function () {
      var icon = $(this);
      icon.removeClass('rotate');
    });
  }
}

function codeEnhanced() {
  // 获取所有代码块的容器
  var wrappers = $(".code-wrapper");
  for (var i = 0; i < wrappers.length; i++) {
    var wrapper = wrappers[i];
    // 调用折叠函数
    addCodeCollapse(wrapper);
    // 添加复制按钮
    addCopyButton(wrapper);
  }
}

// 页面加载完成后执行主逻辑
$(document).ready(codeEnhanced);

