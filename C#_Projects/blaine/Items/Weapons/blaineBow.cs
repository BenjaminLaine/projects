using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace blaine.Items.Weapons
{
	public class blaineBow : ModItem
	{
		public override void SetStaticDefaults() 
		{
			DisplayName.SetDefault("Amazing Bow!"); 
			Tooltip.SetDefault("Dis's a test BoW!");
		}

		public override void SetDefaults() 
		{
			item.rare = ItemRarityID.Expert;
			item.damage = 7777;
			item.noMelee = true;
			item.Size = new Vector2(12, 24);
			item.useTime = 7;
			item.useAnimation = 7;
			item.useStyle = ItemUseStyleID.HoldingOut;
			item.knockBack = 6;
			item.value = Item.sellPrice(1, 1, 1, 1);
			item.UseSound = SoundID.Item5;
			item.autoReuse = true;
			item.ranged = true;
			item.useTurn = true;
			item.useAmmo = AmmoID.Arrow;
			item.shoot = 1;
			item.shootSpeed = 66f;
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