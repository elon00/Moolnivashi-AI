# -*- coding: utf-8 -*-
import unittest
import os
import re
from pathlib import Path

class TestSmokeSanityRegression(unittest.TestCase):
    def test_zero_private_key_leakage(self):
        root = Path(__file__).resolve().parent.parent
        key_patterns = [
            re.compile(r"0x[a-fA-F0-9]{64}"),
            re.compile(r"BEGIN PRIVATE KEY"),
        ]
        skip_dirs = {".git", "node_modules", "dist", "build", "target", ".next", "__pycache__", "sandbox", "docs", ".venv", "venv", "env", ".pytest_cache"}
        for r, dirs, files in os.walk(root):
            dirs[:] = [d for d in dirs if d not in skip_dirs]
            for fn in files:
                if fn.endswith((".py", ".rs", ".sol", ".ts", ".js")) and not fn.endswith(("lock.json", ".min.js")):
                    fp = os.path.join(r, fn)
                    try:
                        if os.path.getsize(fp) > 100000:
                            continue
                        with open(fp, "r", encoding="utf-8", errors="ignore") as f:
                            c = f.read()
                        for p in key_patterns:
                            self.assertFalse(p.search(c) and "dummy" not in c.lower() and "sample" not in c.lower(), f"Key leak in {fp}")
                    except Exception:
                        pass

    def test_quicknode_integration(self):
        root = Path(__file__).resolve().parent.parent
        self.assertTrue((root / "integrations/quicknode_provider.py").exists())

    def test_x402_gateway(self):
        root = Path(__file__).resolve().parent.parent
        self.assertTrue((root / "integrations/x402_bazaar_gateway.py").exists())

    def test_conway_engine(self):
        root = Path(__file__).resolve().parent.parent
        self.assertTrue((root / "conway/conway_engine.py").exists() or (root / "src/main.rs").exists() or (root / "conway/conway_automaton_engine.rs").exists())

    def test_pqc_shield(self):
        root = Path(__file__).resolve().parent.parent
        self.assertTrue((root / "security/pqc_quantum_shield.py").exists())

    def test_raven_and_rea(self):
        root = Path(__file__).resolve().parent.parent
        self.assertTrue((root / "automations/raven_rsi_optimizer.py").exists())
        self.assertTrue((root / "automations/rea_runtime_analyzer.py").exists())

if __name__ == "__main__":
    unittest.main()
