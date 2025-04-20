#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
extern crate alloc;

use stylus_sdk::{
    alloy_primitives::{Address, U256},
    prelude::*

};


/// Declare storage
sol_storage! {
    #[entrypoint]
    pub struct EruptionScore {
        // Mapping from address => score
        mapping(address => uint256) scores;
    }
}

/// Public functions available in the contract
#[public]
impl EruptionScore {
    /// Add score for a new address (only if it doesn't exist)
    pub fn add_score(&mut self, user: Address, score: U256) {
        let existing = self.scores.get(user);
        assert!(existing == U256::ZERO, "Score already exists");
        self.scores.insert(user, score);
    }

    /// Update score for an address (only if already exists)
    pub fn update_score(&mut self, user: Address, new_score: U256) {
        let existing = self.scores.get(user);
        assert!(existing != U256::ZERO, "Score not found");
        self.scores.insert(user, new_score);
    }

    /// Get score for an address
    pub fn get_score(&self, user: Address) -> U256 {
        self.scores.get(user)
    }
}


#[cfg(test)]
mod test {
    use super::*;
    use stylus_sdk::testing::*;

    #[test]
    fn test_eruption_score() {
        let vm = TestVM::default();
        let mut contract = EruptionScore::from(&vm);

        let user: Address = Address::from([0x11; 20]);

        // Initially zero
        assert_eq!(contract.get_score(user), U256::ZERO);

        // Add score
        contract.add_score(user, U256::from(10));
        assert_eq!(contract.get_score(user), U256::from(10));

        // Update score
        contract.update_score(user, U256::from(42));
        assert_eq!(contract.get_score(user), U256::from(42));
    }
}
