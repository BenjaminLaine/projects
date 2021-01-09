using System;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;
using Microsoft.Xna.Framework;

namespace blaine.Items.Weapons
{
	public class blaineUzi : ModItem
	{
		public override void SetStaticDefaults() 
		{
			DisplayName.SetDefault("Spirit Uzi"); 
			Tooltip.SetDefault("Contains Flame Spirit");
		}

		public override void SetDefaults() 
		{
			item.rare = ItemRarityID.Blue;
			item.damage = 15;
			item.noMelee = true;
			item.Size = new Vector2(12, 24);
			item.useTime = 20;
			item.useAnimation = 20;
			item.useStyle = ItemUseStyleID.HoldingOut;
			item.knockBack = 3;
			item.value = Item.sellPrice(0, 0, 50, 0);
			item.UseSound = SoundID.Item11;
			item.autoReuse = true;
			item.ranged = true;
			item.useAmmo = AmmoID.Bullet;
			item.shoot = 1;
			item.shootSpeed = 20f;
		}

		public override bool Shoot(Player player, ref Vector2 position, ref float speedX, ref float speedY, ref int type, ref int damage, ref float knockBack)
		{
			if (type == ProjectileID.Bullet) // any projectile/ammo
			{
				type = mod.ProjectileType("blaineBullet"); // change "Whatever" to your modded projectile
			}
			return true; // return true to allow tmodloader to call Projectile.NewProjectile as normal
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