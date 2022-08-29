import {afterEach, expect, it, jest, test} from '@jest/globals'
import {readFileSync} from 'fs'
import {join} from 'path'

jest.mock('@actions/core')
jest.mock('../src/package-managers/common')

import * as core from '@actions/core'
import run from '../src/action'
import * as common from '../src/package-managers/common'

function mockGetUrl(resourcePath: string) {
  return jest.spyOn(common, 'getUrl').mockImplementation(() => {
    return Promise.resolve(
      readFileSync(join(__dirname, resourcePath)).toString()
    )
  })
}

describe('the run action', () => {
  describe('using the npm package manager', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('returns the latest "@lumigo/opentelemetry" version', async () => {
      const getUrlSpy = mockGetUrl('npm/package-@lumigo-opentelemetry.json')
      const setFailedSpy = jest.spyOn(core, 'setFailed')
      const getInputSpy = jest
        .spyOn(core, 'getInput')
        .mockImplementation((name, options) => {
          switch (name) {
            case 'package-manager':
              return 'npm'
            case 'package-name':
              return '@lumigo/opentelemetry'
            default:
              return ''
          }
        })

      const setOutput = jest.spyOn(core, 'setOutput')

      await run()

      expect(getInputSpy).toHaveBeenCalled()
      expect(getUrlSpy).toHaveBeenCalled()
      expect(setOutput).toHaveBeenCalledWith('package-manager', 'npm')
      expect(setOutput).toHaveBeenCalledWith(
        'package-name',
        '@lumigo/opentelemetry'
      )
      expect(setOutput).toHaveBeenCalledWith('version', '1.1.3')
      expect(setFailedSpy).not.toHaveBeenCalled()
    })

    it('sets the action as failed when package does not exist', async () => {
      const error = new Error('Not found')

      const getUrlSpy = jest
        .spyOn(common, 'getUrl')
        .mockImplementation(() => Promise.reject(error))
      const setFailedSpy = jest.spyOn(core, 'setFailed')
      const getInputSpy = jest
        .spyOn(core, 'getInput')
        .mockImplementation((name, options) => {
          switch (name) {
            case 'package-manager':
              return 'npm'
            case 'package-name':
              return '@lumigo/opentelemetry'
            default:
              return ''
          }
        })

      const setOutput = jest.spyOn(core, 'setOutput')

      await run()

      expect(getInputSpy).toHaveBeenCalled()
      expect(getUrlSpy).toHaveBeenCalled()
      expect(setOutput).toHaveBeenCalledWith('package-manager', 'npm')
      expect(setOutput).toHaveBeenCalledWith(
        'package-name',
        '@lumigo/opentelemetry'
      )
      expect(setFailedSpy).toHaveBeenCalledWith(error)
    })
  })

  describe('using the pypi package manager', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('returns the latest "lumigo_opentelemetry" version', async () => {
      const getUrlSpy = mockGetUrl('pypi/package-lumigo-opentelemetry.xml')
      const setFailedSpy = jest.spyOn(core, 'setFailed')
      const getInputSpy = jest
        .spyOn(core, 'getInput')
        .mockImplementation((name, options) => {
          switch (name) {
            case 'package-manager':
              return 'pypi'
            case 'package-name':
              return 'lumigo_opentelemetry'
            default:
              return ''
          }
        })

      const setOutput = jest.spyOn(core, 'setOutput')

      await run()

      expect(getInputSpy).toHaveBeenCalled()
      expect(getUrlSpy).toHaveBeenCalled()
      expect(setFailedSpy).not.toHaveBeenCalled()
      expect(setOutput).toHaveBeenCalledWith('package-manager', 'pypi')
      expect(setOutput).toHaveBeenCalledWith(
        'package-name',
        'lumigo_opentelemetry'
      )
      expect(setOutput).toHaveBeenCalledWith('version', '1.0.20')
      expect(setFailedSpy).not.toHaveBeenCalled()
    })

    it('sets the action as failed when package does not exist', async () => {
      const error = new Error('Not found')

      const getUrlSpy = jest
        .spyOn(common, 'getUrl')
        .mockImplementation(() => Promise.reject(error))
      const setFailedSpy = jest.spyOn(core, 'setFailed')
      const getInputSpy = jest
        .spyOn(core, 'getInput')
        .mockImplementation((name, options) => {
          switch (name) {
            case 'package-manager':
              return 'pypi'
            case 'package-name':
              return 'lumigo_opentelemetry'
            default:
              return ''
          }
        })

      const setOutput = jest.spyOn(core, 'setOutput')

      await run()

      expect(getInputSpy).toHaveBeenCalled()
      expect(getUrlSpy).toHaveBeenCalled()
      expect(setOutput).toHaveBeenCalledWith('package-manager', 'pypi')
      expect(setOutput).toHaveBeenCalledWith(
        'package-name',
        'lumigo_opentelemetry'
      )
      expect(setFailedSpy).toHaveBeenCalledWith(error)
    })
  })
})
