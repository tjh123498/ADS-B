import sys
from os.path import abspath
from PyQt5.QtCore import QUrl
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView


class MapWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        web_view = QWebEngineView()
        self.web_view = web_view

        url = QUrl.fromLocalFile(abspath("dist/index.html"))
        web_view.load(url)
        self.setCentralWidget(web_view)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    ex = MapWindow()
    ex.show()
    sys.exit(app.exec_())
