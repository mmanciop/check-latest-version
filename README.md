<p align="center">
  <a href="https://github.com/mmanciop/check-latest-versions/actions"><img alt="mmanciop/check-latest-versions status" src="https://github.com/mmanciop/check-latest-versions/workflows/build-test/badge.svg"></a>
</p>

# Check Latest Versions GitHub Action

This GitHub action checks the latest version of given packages in [npm](npmjs.com/) or [PyPI](https://pypi.org/).
 
## Usage

```yaml
steps:
- id: check-latest-version
  uses: mmanciop/check-latest-versions@v1
  with:
    package-manager: <npm or pypi>
    package-name: <e.g., @lumigo/opentelemetry or lumigo_opentelemetry>
...
- run: |
    echo "The latest version of the package is ${{steps.check-latest-version.outputs.version}}"
```

## License

The scripts and documentation in this project are released under the [MIT License](./LICENSE).