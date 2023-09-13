import { Bot } from 'mineflayer'
const registry = require('prismarine-registry')('1.8')

const Block = require('prismarine-block')(registry)
type Block = typeof Block

export function findFromVein (bot: Bot, block: Block, maxBlocks: number, maxDistance: number, floodRadius: number): Block[] {
  const targets: Block[] = []
  const open: Block[] = [block]
  const type = block.type
  const center = block.position

  for (let i = 0; i < maxBlocks; i++) {
    const next = open.pop()
    if (next == null) break

    targets.push(next)

    for (let x = -floodRadius; x <= floodRadius; x++) {
      for (let y = -floodRadius; y <= floodRadius; y++) {
        for (let z = -floodRadius; z <= floodRadius; z++) {
          const neighborPos = next.position.offset(x, y, z)
          if (neighborPos.manhattanDistanceTo(center) > maxDistance) continue

          const neighbor = bot.blockAt(neighborPos)
          if (neighbor == null || neighbor.type !== type) continue

          if (targets.includes(neighbor)) continue
          if (open.includes(neighbor)) continue

          open.push(neighbor)
        }
      }
    }
  }

  return targets
}
