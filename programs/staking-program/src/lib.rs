use anchor_lang::prelude::*;

declare_id!("4i4Vv4AHPpXoDpsK73CxHURMaQXtWBA8VWcuJ9h79qiT");

pub mod constants {
    pub const VAULT_SEED: &[u8] = b"vault";
    pub const STAKE_INFO_SEED: &[u8] = b"stake_info";
    pub const TOKEN_SEED: &[u8] = b"token";
}

#[program]
pub mod staking_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn stake(ctx: Context<Initialize>, amount: u64) -> Result<()> {
        Ok(())
    }
    pub fn deStake(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {

    #[account(mut)]
    pub signer:Signer<'info>;

    #[account(
        init_if_needed,
        seeds=[constants::VAULT_SEED],
        bump,
        payer=signer,
        token::mint=,
        token::authority=,
    )]
    pub token_vault_account:Account<'info,TokenAccount>
}
