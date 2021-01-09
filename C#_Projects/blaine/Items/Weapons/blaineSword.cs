using System;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;
using Microsoft.Xna.Framework;

namespace blaine.Items.Weapons
{
	public class blaineSword : ModItem
	{
		public override void SetStaticDefaults() 
		{
			DisplayName.SetDefault("Ultimaweapon"); // By default, capitalization in classnames will add spaces to the display name. You can customize the display name here by uncommenting this line.
			Tooltip.SetDefault("Ultima weapon 2.");
		}

		public override void SetDefaults() 
		{
			item.damage = 10;
			item.melee = true;
			item.Size = new Vector2(50);
			item.useTime = 17;
			item.useAnimation = 17;
			item.useStyle = 1;
			item.knockBack = 2.5f;
			item.value = Item.sellPrice(0, 1, 0, 7);
			item.rare = ItemRarityID.Blue;
			item.UseSound = SoundID.Item1;
			item.useTurn = true;
			item.autoReuse = true;
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