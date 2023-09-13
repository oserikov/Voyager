import { Bot } from 'mineflayer'
import { Entity } from 'prismarine-entity'

const registry = require('prismarine-registry')('1.8')

const Block = require('prismarine-block')(registry)
type Block = typeof Block

export type Collectable = Block | Entity

export class Targets {
  private readonly bot: Bot
  private targets: Collectable[] = []

  constructor (bot: Bot) {
    this.bot = bot
  }

  appendTargets (targets: Collectable[]): void {
    for (const target of targets) {
      this.appendTarget(target)
    }
  }

  appendTarget (target: Collectable): void {
    if (this.targets.includes(target)) return
    this.targets.push(target)
  }

  /**
   * Gets the closest target to the bot in this list.
   *
   * @returns The closest target, or null if there are no targets.
   */
  getClosest (): Collectable | null {
    let closest: Collectable | null = null
    let distance: number = 0

    for (const target of this.targets) {
      const dist = target.position.distanceTo(this.bot.entity.position)

      if (closest == null || dist < distance) {
        closest = target
        distance = dist
      }
    }

    return closest
  }

  get empty (): boolean {
    return this.targets.length === 0
  }

  clear (): void {
    this.targets.length = 0
  }

  removeTarget (target: Collectable): void {
    const index = this.targets.indexOf(target)
    if (index < 0) return
    this.targets.splice(index, 1)
  }
}
