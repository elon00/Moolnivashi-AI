# -*- coding: utf-8 -*-
"""
Deterministic 64-bit Conway Non-Linear Invariant State Engine
Rule: B3/S23 Cyclic Cellular Automaton
"""
import hashlib

class ConwayAutomatonEngine:
    def __init__(self, seed: int = 0xDEADBEEFCAFE0001):
        self.state_grid = seed & 0xFFFFFFFFFFFFFFFF
        self.cycle_count = 0
        self.invariant_checksum = seed ^ 0x55AA55AA55AA55AA

    def step(self) -> int:
        next_grid = 0
        for i in range(64):
            left = 63 if i == 0 else i - 1
            right = 0 if i == 63 else i + 1
            
            alive_neighbors = ((self.state_grid >> left) & 1) + ((self.state_grid >> right) & 1)
            current = (self.state_grid >> i) & 1
            
            if current == 1 and alive_neighbors in (1, 2):
                next_bit = 1
            elif current == 0 and alive_neighbors == 1:
                next_bit = 1
            else:
                next_bit = 0
                
            next_grid |= (next_bit << i)
            
        self.state_grid = next_grid
        self.cycle_count += 1
        
        h = hashlib.sha256(f"{self.state_grid}:{self.cycle_count}".encode()).digest()
        step_hash = int.from_bytes(h[:8], "big")
        self.invariant_checksum ^= step_hash
        return self.state_grid

    def run_cycles(self, cycles: int = 10000) -> int:
        for _ in range(cycles):
            self.step()
        return self.invariant_checksum

if __name__ == "__main__":
    engine = ConwayAutomatonEngine()
    chk = engine.run_cycles(10000)
    print(f"Executed 10,000 cycles. Final Checksum: 0x{chk:016X}")
