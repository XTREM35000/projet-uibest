import { describe, test, expect, beforeEach } from 'vitest'
import { Brand } from '../server/models/Brand'
import { clearDatabase, mockBrandData } from '../server/utils/test-utils'

describe('Brand Configuration', () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  test('should create brand configuration', async () => {
    const brand = new Brand(mockBrandData)
    await brand.save()

    const savedBrand = await Brand.findOne()
    expect(savedBrand).toBeDefined()
    expect(savedBrand?.companyName).toBe(mockBrandData.companyName)
    expect(savedBrand?.isConfigured).toBe(true)
  })

  test('should update brand configuration', async () => {
    const brand = new Brand(mockBrandData)
    await brand.save()

    const updatedData = {
      ...mockBrandData,
      companyName: 'Updated Name',
      welcomeMessage: 'Updated Message'
    }

    const savedBrand = await Brand.findOne()
    Object.assign(savedBrand!, updatedData)
    await savedBrand!.save()

    const updatedBrand = await Brand.findOne()
    expect(updatedBrand?.companyName).toBe('Updated Name')
    expect(updatedBrand?.welcomeMessage).toBe('Updated Message')
  })

  test('should require companyName', async () => {
    const invalidBrand = new Brand({
      ...mockBrandData,
      companyName: undefined
    })

    await expect(invalidBrand.save()).rejects.toThrow()
  })
})