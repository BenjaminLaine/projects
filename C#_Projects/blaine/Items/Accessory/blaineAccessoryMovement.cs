using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace blaine.Items.Accessory
{
	public class blaineAccessoryMovement : ModItem
	{
		public override void SetStaticDefaults()
		{
			DisplayName.SetDefault("Orb of Greater Movement");
			Tooltip.SetDefault("Enables Superior Movement");
		}

		public override void SetDefaults()
		{
			item.defense = 2;
			item.accessory = true;
			item.rare = ItemRarityID.Blue;
			item.value = Item.sellPrice(silver: 60);
		}

		public override void UpdateAccessory(Player player, bool hideVisual)
		{
			blainePlayerDash mp = player.GetModPlayer<blainePlayerDash>();
			player.noFallDmg = true;
			player.doubleJumpCloud = true;
			player.spikedBoots = 2;

			//If the dash is not active, immediately return so we don't do any of the logic for it
			if (!mp.DashActive)
				return;

			//This is where we set the afterimage effect.  You can replace these two lines with whatever you want to happen during the dash
			//Some examples include:  spawning dust where the player is, adding buffs, making the player immune, etc.
			//Here we take advantage of "player.eocDash" and "player.armorEffectDrawShadowEOCShield" to get the Shield of Cthulhu's afterimage effect
			player.eocDash = mp.DashTimer;
			player.armorEffectDrawShadowEOCShield = true;
			player.noKnockback = true;
			player.endurance += 1f;

			//If the dash has just started, apply the dash velocity in whatever direction we wanted to dash towards
			if (mp.DashTimer == blainePlayerDash.MAX_DASH_TIMER)
			{
				Vector2 newVelocity = player.velocity;

				//Only apply the dash velocity if our current speed in the wanted direction is less than DashVelocity
				if ((mp.DashDir == blainePlayerDash.DashUp && player.velocity.Y > -mp.DashVelocity) || (mp.DashDir == blainePlayerDash.DashDown && player.velocity.Y < mp.DashVelocity))
				{
					//Y-velocity is set here
					//If the direction requested was DashUp, then we adjust the velocity to make the dash appear "faster" due to gravity being immediately in effect
					//This adjustment is roughly 1.3x the intended dash velocity
					float dashDirection = mp.DashDir == blainePlayerDash.DashDown ? 1 : -1.3f;
					newVelocity.Y = dashDirection * mp.DashVelocity;
				}
				else if ((mp.DashDir == blainePlayerDash.DashLeft && player.velocity.X > -mp.DashVelocity) || (mp.DashDir == blainePlayerDash.DashRight && player.velocity.X < mp.DashVelocity))
				{
					//X-velocity is set here
					int dashDirection = mp.DashDir == blainePlayerDash.DashRight ? 1 : -1;
					newVelocity.X = dashDirection * mp.DashVelocity;
				}

				player.velocity = newVelocity;
			}

			//Decrement the timers
			mp.DashTimer--;
			mp.DashDelay--;

			if (mp.DashDelay == 0)
			{
				//The dash has ended.  Reset the fields
				mp.DashDelay = blainePlayerDash.MAX_DASH_DELAY;
				mp.DashTimer = blainePlayerDash.MAX_DASH_TIMER;
				mp.DashActive = false;
			}
		}

		public override void AddRecipes()
		{
			ModRecipe recipe = new ModRecipe(mod);
			recipe.AddIngredient(ItemID.DirtBlock, 1);
			recipe.AddTile(TileID.WorkBenches);
			recipe.SetResult(this);
			recipe.AddRecipe();
		}
	}

	public class blainePlayerDash : ModPlayer
	{
		//These indicate what direction is what in the timer arrays used
		public static readonly int DashDown = 0;
		public static readonly int DashUp = 1;
		public static readonly int DashRight = 2;
		public static readonly int DashLeft = 3;

		//The direction the player is currently dashing towards.  Defaults to -1 if no dash is ocurring.
		public int DashDir = -1;

		//The fields related to the dash accessory
		public bool DashActive = false;
		public int DashDelay = MAX_DASH_DELAY;
		public int DashTimer = MAX_DASH_TIMER;
		//The initial velocity.  10 velocity is about 37.5 tiles/second or 50 mph
		public readonly float DashVelocity = 10f;
		//These two fields are the max values for the delay between dashes and the length of the dash in that order
		//The time is measured in frames
		public static readonly int MAX_DASH_DELAY = 65;
		public static readonly int MAX_DASH_TIMER = 35;

		public override void ResetEffects()
		{
			//ResetEffects() is called not long after player.doubleTapCardinalTimer's values have been set

			//Check if the ExampleDashAccessory is equipped and also check against this priority:
			// If the Shield of Cthulhu, Master Ninja Gear, Tabi and/or Solar Armour set is equipped, prevent this accessory from doing its dash effect
			//The priority is used to prevent undesirable effects.
			//Without it, the player is able to use the ExampleDashAccessory's dash as well as the vanilla ones
			bool dashAccessoryEquipped = false;

			//This is the loop used in vanilla to update/check the not-vanity accessories
			for (int i = 3; i < 8 + player.extraAccessorySlots; i++)
			{
				Item item = player.armor[i];

				//Set the flag for the ExampleDashAccessory being equipped if we have it equipped OR immediately return if any of the accessories are
				// one of the higher-priority ones
				if (item.type == ModContent.ItemType<blaineAccessoryMovement>())
					dashAccessoryEquipped = true;
				else if (item.type == ItemID.EoCShield || item.type == ItemID.MasterNinjaGear || item.type == ItemID.Tabi)
					return;
			}

			//If we don't have the ExampleDashAccessory equipped or the player has the Solor armor set equipped, return immediately
			//Also return if the player is currently on a mount, since dashes on a mount look weird, or if the dash was already activated
			if (!dashAccessoryEquipped || player.setSolar || player.mount.Active || DashActive)
				return;

			//When a directional key is pressed and released, vanilla starts a 15 tick (1/4 second) timer during which a second press activates a dash
			//If the timers are set to 15, then this is the first press just processed by the vanilla logic.  Otherwise, it's a double-tap
			if (player.controlDown && player.releaseDown && player.doubleTapCardinalTimer[DashDown] < 15)
				DashDir = DashDown;
			else if (player.controlUp && player.releaseUp && player.doubleTapCardinalTimer[DashUp] < 15)
				DashDir = DashUp;
			else if (player.controlRight && player.releaseRight && player.doubleTapCardinalTimer[DashRight] < 15)
				DashDir = DashRight;
			else if (player.controlLeft && player.releaseLeft && player.doubleTapCardinalTimer[DashLeft] < 15)
				DashDir = DashLeft;
			else
				return;  //No dash was activated, return

			DashActive = true;

			//Here you'd be able to set an effect that happens when the dash first activates
			//Some examples include:  the larger smoke effect from the Master Ninja Gear and Tabi
		}
	}
}