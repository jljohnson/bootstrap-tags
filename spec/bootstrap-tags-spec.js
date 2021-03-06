// Generated by CoffeeScript 1.4.0
(function() {

  describe("Bootstrap Tags", function() {
    describe("Read only tag system", function() {
      beforeEach(function() {
        this.$domElement = $('body').append('<div id="tagger" class="tag-list"><div class="tags"></div></div>');
        this.initTagData = ['one', 'two', 'three'];
        return this.tags = $('#tagger', this.$domElement).tags({
          tagData: this.initTagData,
          readOnly: true
        });
      });
      afterEach(function() {
        return $('#tagger').remove();
      });
      it("can't add tags", function() {
        var tagLength;
        tagLength = this.tags.getTags().length;
        this.tags.addTag('new tag');
        return expect(this.tags.getTags().length).toEqual(tagLength);
      });
      it("can't remove tags", function() {
        var tagLength;
        tagLength = this.tags.getTags().length;
        this.tags.removeTag('one');
        return expect(this.tags.hasTag('one')).toBeTruthy();
      });
      it("can't rename tag", function() {
        this.tags.renameTag('one', 'new name');
        expect(this.tags.hasTag('new name')).toBeFalsy();
        return expect(this.tags.hasTag('one')).toBeTruthy();
      });
      return it("can get the list of tags", function() {
        return expect(this.tags.getTags()).toEqual(this.initTagData);
      });
    });
    return describe("Full tag system", function() {
      beforeEach(function() {
        this.$domElement = $('body').append('<div id="tagger" class="tag-list"><div class="tags"></div></div>');
        this.initTagData = ['one', 'two', 'three'];
        return this.tags = $('#tagger', this.$domElement).tags({
          tagData: this.initTagData
        });
      });
      afterEach(function() {
        return $('#tagger').remove();
      });
      it("can add tag", function() {
        var tagLength;
        tagLength = this.tags.getTags().length;
        this.tags.addTag('new tag');
        expect(this.tags.getTags().length).toEqual(tagLength + 1);
        return expect(this.tags.hasTag('new tag')).toBeTruthy();
      });
      it("can get the list of tags", function() {
        return expect(this.tags.getTags()).toEqual(this.initTagData);
      });
      it("can remove tag, specified by string", function() {
        expect(this.tags.hasTag('one')).toBeTruthy();
        this.tags.removeTag('one');
        return expect(this.tags.hasTag('one')).toBeFalsy();
      });
      it("can remove the last tag", function() {
        var lastTag, tagList;
        tagList = this.tags.getTags();
        lastTag = tagList[tagList.length - 1];
        this.tags.removeLastTag();
        return expect(this.tags.hasTag(lastTag)).toBeFalsy();
      });
      it("can add tag with popover content", function() {
        var tagsWithContent;
        this.tags.addTagWithContent('new tag', 'new content');
        tagsWithContent = this.tags.getTagsWithContent();
        console.log(tagsWithContent);
        return expect(tagsWithContent[tagsWithContent.length - 1].content).toEqual('new content');
      });
      it("can change the popover content for a tag", function() {
        var content;
        content = 'new tag content for the first tag';
        this.tags.setPopover('one', content);
        return expect(this.tags.getTagWithContent('one').content).toEqual(content);
      });
      it("can rename tag", function() {
        this.tags.renameTag('one', 'new name');
        expect(this.tags.hasTag('new name')).toBeTruthy();
        return expect(this.tags.hasTag('one')).toBeFalsy();
      });
      it("calls before/after adding/deleting tags callbacks in the right order", function() {
        var $domElement, afterAddingTag, afterAddingTagCalled, afterDeletingTag, afterDeletingTagCalled, beforeAddingTag, beforeAddingTagCalled, beforeDeletingTag, beforeDeletingTagCalled, initTagData, tags;
        $domElement = $('body').append('<div id="tagger2" class="tag-list"><div class="tags"></div></div>');
        initTagData = ['one', 'two', 'three'];
        beforeAddingTagCalled = false;
        afterAddingTagCalled = false;
        beforeDeletingTagCalled = false;
        afterDeletingTagCalled = false;
        beforeAddingTag = function() {
          return beforeAddingTagCalled = true;
        };
        afterAddingTag = function() {
          return afterAddingTagCalled = true;
        };
        beforeDeletingTag = function() {
          return beforeDeletingTagCalled = true;
        };
        afterDeletingTag = function() {
          return afterDeletingTagCalled = true;
        };
        tags = $('#tagger2', this.$domElement).tags({
          tagData: this.initTagData,
          beforeAddingTag: beforeAddingTag,
          afterAddingTag: afterAddingTag,
          beforeDeletingTag: beforeDeletingTag,
          afterDeletingTag: afterDeletingTag
        });
        expect(beforeAddingTag && afterAddingTag && beforeDeletingTag && afterDeletingTag).toBeTruthy();
        return $('#tagger2').remove();
      });
      return it("can exclude tags via the excludes function option", function() {
        var $domElement, excludesFunction, tags;
        $domElement = $('body').append('<div id="tagger2" class="tag-list"><div class="tags"></div></div>');
        excludesFunction = function(tag) {
          if (tag.indexOf('foo') > -1) {
            return false;
          }
          return true;
        };
        tags = $('#tagger2', this.$domElement).tags({
          excludes: excludesFunction
        });
        tags.addTag('foo').addTag('bar').addTag('baz').addTag('foobarbaz');
        expect(tags.getTags()).toEqual(['foo', 'foobarbaz']);
        return $('#tagger2').remove();
      });
    });
  });

}).call(this);
