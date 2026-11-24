// 64-bit Conway Non-Linear Invariant State Engine (Rust)
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

pub struct ConwayAutomatonEngine {
    pub state_grid: u64,
    pub cycle_count: u64,
    pub invariant_checksum: u64,
}

impl ConwayAutomatonEngine {
    pub fn new(seed: u64) -> Self {
        Self {
            state_grid: seed,
            cycle_count: 0,
            invariant_checksum: seed ^ 0x55AA55AA55AA55AA,
        }
    }

    pub fn step(&mut self) -> u64 {
        let mut next_grid = 0u64;
        for i in 0..64 {
            let left = if i == 0 { 63 } else { i - 1 };
            let right = if i == 63 { 0 } else { i + 1 };
            
            let alive_neighbors = ((self.state_grid >> left) & 1) + ((self.state_grid >> right) & 1);
            let current = (self.state_grid >> i) & 1;
            
            let next_bit = if current == 1 && (alive_neighbors == 1 || alive_neighbors == 2) {
                1
            } else if current == 0 && alive_neighbors == 1 {
                1
            } else {
                0
            };
            
            next_grid |= next_bit << i;
        }
        
        self.state_grid = next_grid;
        self.cycle_count += 1;
        
        let mut hasher = DefaultHasher::new();
        self.state_grid.hash(&mut hasher);
        self.cycle_count.hash(&mut hasher);
        self.invariant_checksum ^= hasher.finish();
        
        self.state_grid
    }

    pub fn run_cycles(&mut self, cycles: u64) -> u64 {
        for _ in 0..cycles {
            self.step();
        }
        self.invariant_checksum
    }
}
