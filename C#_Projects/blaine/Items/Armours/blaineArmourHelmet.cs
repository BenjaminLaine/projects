using Terraria;
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
	[AutoloadEquip(EquipType.Head)]
	public class blaineArmourHelmet : ModItem
	{
		public override void SetDefaults()
		{
			item.Size = new Vector2(18);
			item.value = Item.sellPrice(silver: 26);
			item.rare = ItemRarityID.Blue;
			item.defense = 9;
		}

		public override void AddRecipes()
		{
			ModRecipe recipe = new ModRecipe(mod);
			recipe.AddIngredient(ItemID.DirtBlock, 1);
			recipe.AddTile(TileID.WorkBenches);
			recipe.SetResult(this);
			recipe.AddRecipe();
		}

		public override bool IsArmorSet(Item head, Item body, Item legs)
		{
			return body.type == ItemType<blaineArmourChestplate>() && legs.type == ItemType<blaineArmourGreaves>();
		}


		public override bool DrawHead()
		{
			return false;
		}

		public override void UpdateArmorSet(Player player)
		{
			player.thrownCrit += 8;
			player.rangedCrit += 8;
			player.meleeCrit += 8;
			player.magicCrit += 8;

			player.lifeRegen = 3;

			player.moveSpeed += 0.2f;
		}
	}
}
