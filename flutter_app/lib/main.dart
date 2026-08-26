import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:http/http.dart' as http;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp();
  } catch (e) {
    debugPrint("Firebase init: $e");
  }
  runApp(const WebDevHubApp());
}

class WebDevHubApp extends StatelessWidget {
  const WebDevHubApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Web Developer Hub',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF020617),
        primaryColor: const Color(0xFF06B6D4),
        cardColor: const Color(0xFF0F172A),
        textTheme: GoogleFonts.plusJakartaSansTextTheme(
          ThemeData(brightness: Brightness.dark).textTheme,
        ),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF06B6D4),
          secondary: Color(0xFFA855F7),
          surface: Color(0xFF0F172A),
          background: Color(0xFF020617),
        ),
      ),
      home: const MainDashboardScreen(),
    );
  }
}

class MainDashboardScreen extends StatefulWidget {
  const MainDashboardScreen({super.key});

  @override
  State<MainDashboardScreen> createState() => _MainDashboardScreenState();
}

class _MainDashboardScreenState extends State<MainDashboardScreen> {
  int _currentTabIndex = 0;

  final List<Widget> _screens = const [
    CssGeneratorView(),
    TextAnalyzerView(),
    ResponsiveResizerView(),
    CloudVaultView(),
    ApiTesterView(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF06B6D4), Color(0xFF8B5CF6)],
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text("</>", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "WEB DEV HUB",
                  style: GoogleFonts.plusJakartaSans(
                    fontWeight: FontWeight.w800,
                    fontSize: 15,
                    letterSpacing: -0.5,
                  ),
                ),
                const Text(
                  "DEVELOPER UTILITIES",
                  style: TextStyle(fontSize: 9, color: Color(0xFF22D3EE), fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ],
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFF334155)),
            ),
            child: Row(
              children: const [
                Icon(Icons.circle, color: Color(0xFF10B981), size: 8),
                SizedBox(width: 6),
                Text("Online", style: TextStyle(fontSize: 11, color: Color(0xFF10B981))),
              ],
            ),
          ),
        ],
      ),
      body: _screens[_currentTabIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentTabIndex,
        onTap: (index) => setState(() => _currentTabIndex = index),
        backgroundColor: const Color(0xFF0F172A),
        selectedItemColor: const Color(0xFF06B6D4),
        unselectedItemColor: const Color(0xFF64748B),
        type: BottomNavigationBarType.fixed,
        selectedFontSize: 11,
        unselectedFontSize: 10,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.style), label: 'CSS Gen'),
          BottomNavigationBarItem(icon: Icon(Icons.text_fields), label: 'Text'),
          BottomNavigationBarItem(icon: Icon(Icons.devices), label: 'Resizer'),
          BottomNavigationBarItem(icon: Icon(Icons.cloud), label: 'Cloud Vault'),
          BottomNavigationBarItem(icon: Icon(Icons.http), label: 'API Tester'),
        ],
      ),
    );
  }
}

class CssGeneratorView extends StatefulWidget {
  const CssGeneratorView({super.key});

  @override
  State<CssGeneratorView> createState() => _CssGeneratorViewState();
}

class _CssGeneratorViewState extends State<CssGeneratorView> {
  double offsetX = 8;
  double offsetY = 8;
  double blurRadius = 20;
  double spreadRadius = 0;
  double shadowOpacity = 0.25;
  Color shadowColor = Colors.black;

  double borderRadius = 16;
  double borderWidth = 1;
  Color borderColor = const Color(0xFF334155);

  String get generatedCss {
    final r = shadowColor.red;
    final g = shadowColor.green;
    final b = shadowColor.blue;
    final hexBorder = '#${borderColor.value.toRadixString(16).substring(2).toUpperCase()}';
    return """.example {
  box-shadow: ${offsetX.toInt()}px ${offsetY.toInt()}px ${blurRadius.toInt()}px ${spreadRadius.toInt()}px rgba($r, $g, $b, ${shadowOpacity.toStringAsFixed(2)});
  border: ${borderWidth.toInt()}px solid $hexBorder;
  border-radius: ${borderRadius.toInt()}px;
}""";
  }

  void _copyToClipboard() {
    Clipboard.setData(ClipboardData(text: generatedCss));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('CSS copied to clipboard!'), backgroundColor: Color(0xFF10B981)),
    );
  }

  void _saveToFirestore() async {
    try {
      await FirebaseFirestore.instance.collection('snippets').add({
        'title': 'Custom Box Shadow',
        'category': 'css',
        'content': generatedCss,
        'createdAt': DateTime.now().toIso8601String(),
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Saved to Firebase Firestore!'), backgroundColor: Color(0xFFF59E0B)),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error saving: $e'), backgroundColor: Colors.red),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            height: 200,
            decoration: BoxDecoration(
              color: const Color(0xFF090D1A),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF1E293B)),
            ),
            alignment: Alignment.center,
            child: Container(
              width: 150,
              height: 110,
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(borderRadius),
                border: Border.all(color: borderColor, width: borderWidth),
                boxShadow: [
                  BoxShadow(
                    color: shadowColor.withOpacity(shadowOpacity),
                    offset: Offset(offsetX, offsetY),
                    blurRadius: blurRadius,
                    spreadRadius: spreadRadius,
                  ),
                ],
              ),
              child: const Center(
                child: Text("Live Preview", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: _copyToClipboard,
                  icon: const Icon(Icons.copy, size: 16),
                  label: const Text("Copy CSS"),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF06B6D4),
                    foregroundColor: Colors.black,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: _saveToFirestore,
                  icon: const Icon(Icons.cloud_upload, size: 16, color: Color(0xFFF59E0B)),
                  label: const Text("Save to Cloud", style: TextStyle(color: Color(0xFFF59E0B))),
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Color(0xFFF59E0B)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Card(
            color: const Color(0xFF0F172A),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
              side: const BorderSide(color: Color(0xFF1E293B)),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text("BOX SHADOW CONTROLS", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF22D3EE))),
                  _buildSlider("Offset X", offsetX, -50, 50, (v) => setState(() => offsetX = v)),
                  _buildSlider("Offset Y", offsetY, -50, 50, (v) => setState(() => offsetY = v)),
                  _buildSlider("Blur Radius", blurRadius, 0, 100, (v) => setState(() => blurRadius = v)),
                  _buildSlider("Spread Radius", spreadRadius, -50, 50, (v) => setState(() => spreadRadius = v)),
                  _buildSlider("Opacity", shadowOpacity * 100, 0, 100, (v) => setState(() => shadowOpacity = v / 100)),
                  const Divider(color: Color(0xFF1E293B), height: 24),
                  const Text("BORDER & RADIUS", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFFA855F7))),
                  _buildSlider("Radius", borderRadius, 0, 100, (v) => setState(() => borderRadius = v)),
                  _buildSlider("Width", borderWidth, 0, 10, (v) => setState(() => borderWidth = v)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFF020617),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF1E293B)),
            ),
            child: Text(
              generatedCss,
              style: GoogleFonts.jetBrainsMono(fontSize: 12, color: const Color(0xFF22D3EE)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSlider(String label, double val, double min, double max, ValueChanged<double> onChanged) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: const TextStyle(fontSize: 12, color: Color(0xFF94A3B8))),
            Text("${val.toInt()}px", style: const TextStyle(fontSize: 12, color: Colors.white, fontWeight: FontWeight.bold)),
          ],
        ),
        Slider(
          value: val,
          min: min,
          max: max,
          activeColor: const Color(0xFF06B6D4),
          inactiveColor: const Color(0xFF1E293B),
          onChanged: onChanged,
        ),
      ],
    );
  }
}

class TextAnalyzerView extends StatefulWidget {
  const TextAnalyzerView({super.key});

  @override
  State<TextAnalyzerView> createState() => _TextAnalyzerViewState();
}

class _TextAnalyzerViewState extends State<TextAnalyzerView> {
  final TextEditingController _controller = TextEditingController();

  int get wordCount {
    final text = _controller.text.trim();
    if (text.isEmpty) return 0;
    return text.split(RegExp(r'\s+')).length;
  }

  int get charCount => _controller.text.length;
  int get sentenceCount {
    final text = _controller.text.trim();
    if (text.isEmpty) return 0;
    return text.split(RegExp(r'[.!?]+')).where((s) => s.trim().isNotEmpty).length;
  }
  int get readMinutes => (wordCount / 200).ceil();

  void _convertUpper() => setState(() => _controller.text = _controller.text.toUpperCase());
  void _convertLower() => setState(() => _controller.text = _controller.text.toLowerCase());
  void _convertCapitalize() {
    setState(() {
      _controller.text = _controller.text.split(' ').map((word) {
        if (word.isEmpty) return '';
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
      }).join(' ');
    });
  }
  void _clearText() => setState(() => _controller.clear());

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Row(
            children: [
              _metricBox("Words", "$wordCount", Colors.white),
              const SizedBox(width: 8),
              _metricBox("Chars", "$charCount", const Color(0xFF22D3EE)),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              _metricBox("Sentences", "$sentenceCount", const Color(0xFFA855F7)),
              const SizedBox(width: 8),
              _metricBox("Read Time", "$readMinutes min", const Color(0xFF10B981)),
            ],
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: [
              ActionChip(
                label: const Text("UPPERCASE", style: TextStyle(fontSize: 11)),
                onPressed: _convertUpper,
                backgroundColor: const Color(0xFF1E293B),
              ),
              ActionChip(
                label: const Text("lowercase", style: TextStyle(fontSize: 11)),
                onPressed: _convertLower,
                backgroundColor: const Color(0xFF1E293B),
              ),
              ActionChip(
                label: const Text("Capitalize", style: TextStyle(fontSize: 11)),
                onPressed: _convertCapitalize,
                backgroundColor: const Color(0xFF1E293B),
              ),
              ActionChip(
                label: const Text("Clear", style: TextStyle(fontSize: 11, color: Colors.redAccent)),
                onPressed: _clearText,
                backgroundColor: const Color(0xFF3B0712),
              ),
            ],
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _controller,
            maxLines: 10,
            onChanged: (_) => setState(() {}),
            decoration: InputDecoration(
              hintText: "Paste or type your text here...",
              hintStyle: const TextStyle(color: Color(0xFF475569)),
              filled: true,
              fillColor: const Color(0xFF0F172A),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: const BorderSide(color: Color(0xFF1E293B)),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _metricBox(String title, String val, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: const Color(0xFF0F172A),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
            const SizedBox(height: 4),
            Text(val, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: color)),
          ],
        ),
      ),
    );
  }
}

class ResponsiveResizerView extends StatefulWidget {
  const ResponsiveResizerView({super.key});

  @override
  State<ResponsiveResizerView> createState() => _ResponsiveResizerViewState();
}

class _ResponsiveResizerViewState extends State<ResponsiveResizerView> {
  final TextEditingController _urlCtrl = TextEditingController(text: "https://flutter.dev");
  late WebViewController _webViewController;
  double _frameWidth = 375;

  @override
  void initState() {
    super.initState();
    _webViewController = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(Uri.parse(_urlCtrl.text));
  }

  void _loadUrl() {
    String url = _urlCtrl.text.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://$url';
    }
    _webViewController.loadRequest(Uri.parse(url));
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _urlCtrl,
                  decoration: InputDecoration(
                    prefixIcon: const Icon(Icons.language, color: Color(0xFF06B6D4), size: 20),
                    hintText: "https://example.com",
                    isDense: true,
                    filled: true,
                    fillColor: const Color(0xFF0F172A),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              ElevatedButton(
                onPressed: _loadUrl,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF06B6D4),
                  foregroundColor: Colors.black,
                ),
                child: const Text("Load"),
              ),
            ],
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _deviceBtn("Mobile", 375),
            const SizedBox(width: 8),
            _deviceBtn("Tablet", 768),
            const SizedBox(width: 8),
            _deviceBtn("Full", double.infinity),
          ],
        ),
        const SizedBox(height: 10),
        Expanded(
          child: Center(
            child: Container(
              width: _frameWidth == double.infinity ? double.infinity : _frameWidth,
              margin: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF334155), width: 3),
              ),
              clipBehavior: Clip.antiAlias,
              child: WebViewWidget(controller: _webViewController),
            ),
          ),
        ),
      ],
    );
  }

  Widget _deviceBtn(String title, double width) {
    final isSelected = _frameWidth == width;
    return ChoiceChip(
      label: Text(title, style: const TextStyle(fontSize: 11)),
      selected: isSelected,
      selectedColor: const Color(0xFF06B6D4),
      backgroundColor: const Color(0xFF0F172A),
      onSelected: (_) => setState(() => _frameWidth = width),
    );
  }
}

class CloudVaultView extends StatelessWidget {
  const CloudVaultView({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: FirebaseFirestore.instance
          .collection('snippets')
          .orderBy('createdAt', descending: true)
          .snapshots(),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return Center(child: Text("Error: ${snapshot.error}", style: const TextStyle(color: Colors.red)));
        }
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator(color: Color(0xFF06B6D4)));
        }

        final docs = snapshot.data!.docs;
        if (docs.isEmpty) {
          return const Center(
            child: Text("No snippets saved in Firestore Cloud Vault yet.\nSave from CSS Generator or Text Analyzer.", textAlign: TextAlign.center, style: TextStyle(color: Color(0xFF64748B))),
          );
        }

        return ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: docs.length,
          itemBuilder: (context, index) {
            final data = docs[index].data() as Map<String, dynamic>;
            final docId = docs[index].id;
            return Card(
              color: const Color(0xFF0F172A),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
                side: const BorderSide(color: Color(0xFF1E293B)),
              ),
              margin: const EdgeInsets.only(bottom: 12),
              child: ListTile(
                title: Text(data['title'] ?? 'Untitled Snippet', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                subtitle: Text(
                  data['content'] ?? '',
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.jetBrainsMono(fontSize: 11, color: const Color(0xFF22D3EE)),
                ),
                trailing: IconButton(
                  icon: const Icon(Icons.delete_outline, color: Colors.redAccent, size: 20),
                  onPressed: () => FirebaseFirestore.instance.collection('snippets').doc(docId).delete(),
                ),
              ),
            );
          },
        );
      },
    );
  }
}

class ApiTesterView extends StatefulWidget {
  const ApiTesterView({super.key});

  @override
  State<ApiTesterView> createState() => _ApiTesterViewState();
}

class _ApiTesterViewState extends State<ApiTesterView> {
  final TextEditingController _urlCtrl = TextEditingController(text: "https://jsonplaceholder.typicode.com/todos/1");
  String _responseOutput = "Response payload will be displayed here...";
  bool _isLoading = false;

  void _sendRequest() async {
    setState(() => _isLoading = true);
    try {
      final res = await http.get(Uri.parse(_urlCtrl.text));
      setState(() {
        _responseOutput = "Status: ${res.statusCode}\n\n${res.body}";
      });
    } catch (e) {
      setState(() => _responseOutput = "Request Error: $e");
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _urlCtrl,
                  decoration: InputDecoration(
                    hintText: "API Endpoint URL",
                    filled: true,
                    fillColor: const Color(0xFF0F172A),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              ElevatedButton(
                onPressed: _isLoading ? null : _sendRequest,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF10B981),
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                ),
                child: _isLoading ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2)) : const Text("SEND"),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Expanded(
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFF020617),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: const Color(0xFF1E293B)),
              ),
              child: SingleChildScrollView(
                child: Text(
                  _responseOutput,
                  style: GoogleFonts.jetBrainsMono(fontSize: 12, color: const Color(0xFF10B981)),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
