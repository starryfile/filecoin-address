/* eslint-env mocha */
const { expect } = require('chai')
const { newFromString, encode, validateAddressString } = require('../')
const {
  IDAddresses,
  secp256k1Addresses,
  BLSAddresses,
  actorAddresses
} = require('./constants')

function typedArraysAreEqual(a, b) {
  if (a.byteLength !== b.byteLength) return false
  return a.every((val, i) => val === b[i])
}

describe('address', () => {
  describe('newFromString', () => {
    it('should create new ID addresses', async () => {
      IDAddresses.forEach(item => {
        const address = newFromString(item.string)
        expect(
          typedArraysAreEqual(
            Uint8Array.from(address.str),
            item.decodedByteArray
          )
        ).to.eql(true)
      })
    })

    it('should create new secp256k1 addresses', async () => {
      secp256k1Addresses.forEach(item => {
        const address = newFromString(item.string)
        expect(
          typedArraysAreEqual(
            Uint8Array.from(address.str),
            item.decodedByteArray
          )
        ).to.eql(true)
      })
    })

    it('should create new BLS addresses', async () => {
      BLSAddresses.forEach(item => {
        const address = newFromString(item.string)
        expect(
          typedArraysAreEqual(
            Uint8Array.from(address.str),
            item.decodedByteArray
          )
        ).to.eql(true)
      })
    })

    it('should create new Actor addresses', async () => {
      actorAddresses.forEach(item => {
        const address = newFromString(item.string)
        expect(
          typedArraysAreEqual(
            Uint8Array.from(address.str),
            item.decodedByteArray
          )
        ).to.eql(true)
      })
    })

    it('should throw when given a bad ID addresses', async () => {
      expect(() => newFromString('t0')).to.throw()
    })
  })

  describe('encode', () => {
    it('should encode an ID address', async () => {
      const address = newFromString(IDAddresses[0].string)
      expect(encode('t', address)).to.eql(IDAddresses[0].string)
    })

    it('should encode a secp256k1 address', async () => {
      const address = newFromString(secp256k1Addresses[0].string)
      expect(encode('t', address)).to.eql(secp256k1Addresses[0].string)
    })

    it('should encode a BLS address', async () => {
      const address = newFromString(BLSAddresses[0].string)
      expect(encode('t', address)).to.eql(BLSAddresses[0].string)
    })

    it('should encode an Actor address', async () => {
      const address = newFromString(actorAddresses[0].string)
      expect(encode('t', address)).to.eql(actorAddresses[0].string)
    })
  })

  describe('validateAddressString', () => {
    it("should invalidate address that's too short", async () => {
      expect(validateAddressString('t0')).to.eql(false)
    })

    it("should invalidate ID address that's too long", async () => {
      expect(
        validateAddressString('t000000000000000000000000000000000000000')
      ).to.eql(false)
    })

    it('should validate good ID address', async () => {
      expect(validateAddressString('t099')).to.eql(true)
    })

    it("should invalidate secp256k1 address that's too short", async () => {
      expect(validateAddressString('t100')).to.eql(false)
    })

    it("should invalidate secp256k1 address that's too long", async () => {
      expect(
        validateAddressString('t100000000000000000000000000000000000000')
      ).to.eql(false)
    })

    it('should validate good secp256k1 address', async () => {
      expect(
        validateAddressString('t15ihq5ibzwki2b4ep2f46avlkrqzhpqgtga7pdrq')
      ).to.eql(true)
    })

    it("should invalidate actor address that's too short", async () => {
      expect(validateAddressString('t100')).to.eql(false)
    })

    it("should invalidate actor address that's too long", async () => {
      expect(
        validateAddressString('t200000000000000000000000000000000000000')
      ).to.eql(false)
    })

    it('should validate good actor address', async () => {
      expect(
        validateAddressString('t24vg6ut43yw2h2jqydgbg2xq7x6f4kub3bg6as6i')
      ).to.eql(true)
    })

    it("should invalidate BLS address that's too short", async () => {
      expect(validateAddressString('t300')).to.eql(false)
    })

    it("should invalidate BLS address that's too long", async () => {
      expect(
        validateAddressString(
          't3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
      ).to.eql(false)
    })

    it('should validate good BLS address', async () => {
      expect(
        validateAddressString(
          't3vvmn62lofvhjd2ugzca6sof2j2ubwok6cj4xxbfzz4yuxfkgobpihhd2thlanmsh3w2ptld2gqkn2jvlss4a'
        )
      ).to.eql(true)
    })

    it('should validate good BLS mainnet address', async () => {
      expect(
        validateAddressString(
          't3vvmn62lofvhjd2ugzca6sof2j2ubwok6cj4xxbfzz4yuxfkgobpihhd2thlanmsh3w2ptld2gqkn2jvlss4a'
        )
      ).to.eql(true)
    })

    it('should invalidate address with invalid protocol', async () => {
      expect(
        validateAddressString(
          't4vvmn62lofvhjd2ugzca6sof2j2ubwok6cj4xxbfzz4yuxfkgobpihhd2thlanmsh3w2ptld2gqkn2jvlss4a'
        )
      ).to.eql(false)
    })

    it('should invalidate address with invalid network', async () => {
      expect(
        validateAddressString(
          'x3vvmn62lofvhjd2ugzca6sof2j2ubwok6cj4xxbfzz4yuxfkgobpihhd2thlanmsh3w2ptld2gqkn2jvlss4a'
        )
      ).to.eql(false)
    })
  })
})
