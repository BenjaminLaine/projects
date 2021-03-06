﻿using Terraria;
using Microsoft.Xna.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Terraria.ModLoader;
using Terraria.ID;
using static Terraria.ModLoader.ModContent;

namespace blaine.Items.Armours
{
	[AutoloadEquip(EquipType.Body)]
	public class blaineArmourChestplate : ModItem
	{
		public override void SetDefaults()
		{
			item.Size = new Vector2(18);
			item.value = Item.sellPrice(silver: 24);
			item.rare = ItemRarityID.Blue;
			item.defense = 12;
		}

		public override bool DrawBody()
        {
			return false;
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
