using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace blaine.Items.Accessory
{
	public class blaineAccessoryCombat : ModItem
	{
		public override void SetStaticDefaults()
		{
			DisplayName.SetDefault("Orb of Power");
			Tooltip.SetDefault("Enchance Combat Abilities");
		}

		public override void SetDefaults()
		{
			item.accessory = true;
			item.value = Item.sellPrice(0, 0, 50, 0);
			item.rare = ItemRarityID.Blue;
		}

		public override void UpdateAccessory(Player player, bool hideVisual)
		{
			player.GetModPlayer<blainePlayer>().blaineAccessoryCombat = true;
			player.noKnockback = true;
		//	player.endurance += (player.statLife < player.statLifeMax2 / 2) ? 0.5f : (0.1f * );
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
}