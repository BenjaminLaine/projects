using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace blaine.NPCs.Enemies
{
	public class blaineOoze : ModNPC
	{ 
		public override void SetStaticDefaults()
		{
			DisplayName.SetDefault("Ozeling");
			Main.npcFrameCount[npc.type] = Main.npcFrameCount[NPCID.BlueSlime];
		}

		public override void SetDefaults()
		{
			npc.width = 22;
			npc.height = 17;
			npc.lifeMax = 50;
			npc.damage = 18;
			npc.defense = 10;
			npc.HitSound = SoundID.NPCHit1;
			npc.DeathSound = SoundID.NPCDeath1;
			npc.knockBackResist = 0.95f;
			npc.aiStyle = 1;
			aiType = 1;
			animationType = NPCID.BlueSlime;
			banner = Item.NPCtoBanner(NPCID.BlueSlime);
			bannerItem = Item.BannerToItem(banner);
		}

		public override void HitEffect(int hitDirection, double damage)
		{
			if (npc.life <= 0)
			{
				Gore.NewGore(npc.position, npc.velocity, mod.GetGoreSlot("Gore/blaineOozeGore"), 2f);
			}
		}

		public override bool PreNPCLoot()
		{
			if (!npc.HasBuff(20))
			{
				NPC.NewNPC((int)npc.Center.X, (int)npc.Center.Y, (int)mod.NPCType("blaineOoze"));
                NPC.NewNPC((int)npc.Center.X, (int)npc.Center.Y, (int)mod.NPCType("blaineOoze"));
			}
			return (true);
		}

		public override float SpawnChance(NPCSpawnInfo spawnInfo)
		{
			return SpawnCondition.OverworldDaySlime.Chance * 0.1f;
			//return 100f;
			// You can modify this to offer different scenarios. 
			// For example:
			/*
			 * float chance = 0f;
			 * if(!Main.dayTime)
			 * {
			 *     chance += .1f;
			 *     if(spawnInfo.spawnTileY <= Main.rockLayer && spawnInfo.spawnTileY >= Main.worldSurface * 0.15)
			 *     {
			 *         chance += .2f;
			 *     }
			 * }
			 * return chance;
			 */
			// In the above example we set a float chance to 0. We then increase it based on conditions.
			// First we check if it is night. If it is, we increase by .1 then we check if the y is between 
			// Main.rockLayer and a bit above WorldSurface. If it is then we add .2.
			// In this example, the enemy is more likely to spawn on surface and underground but can spawn anywhere 
			// if it is night.
		}

		//public override void HitEffect(int hitDirection, double damage)
		//{
		//    for (int i = 0; i < 10; i++)
		//    {
		//        int dustType = mod.DustType("TMMCDust");
		//        int dustIndex = Dust.NewDust(npc.position, npc.width, npc.height, dustType);
		//        Dust dust = Main.dust[dustIndex];
		//        dust.velocity.X = dust.velocity.X + Main.rand.Next(-50, 51) * 0.01f;
		//        dust.velocity.Y = dust.velocity.Y + Main.rand.Next(-50, 51) * 0.01f;
		//        dust.scale *= 1f + Main.rand.Next(-30, 31) * 0.01f;
		//    }
		//}

		public override void NPCLoot()
		{
			if (Main.rand.Next(4) == 0)
			{
				Item.NewItem(npc.position, ItemID.PlatinumBar, 1);
			}
		}
	}
}
