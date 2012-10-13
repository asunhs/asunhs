package org.asunhs.laboratory.bitmap;

import java.util.Arrays;

import freemarker.template.utility.StringUtil;

public class BitMap {
	
	private final byte BIT = 1;
	private final byte ZERO = 0;
	private final byte MASK = -1;
	
	private final int SIZE = 128;
	private final int length = ((this.SIZE - 1) / Byte.SIZE) + 1;
	
	private byte[] bitMap;
	
	public BitMap() {
		this.bitMap = new byte[this.length];
		initMap();
	}
	
	public BitMap(byte[] bitMap) {
		this.bitMap = Arrays.copyOfRange(bitMap, 0, this.length);
	}
		
	private void initMap() {
		for (int index = this.length; index-- != 0;) {
			this.bitMap[index] = (byte) 0x00;
		}
	}
	
	private void validate(int pos) {
		if (pos < 0 || pos >= this.SIZE) {
			throw new ArrayIndexOutOfBoundsException();
		}
	}
	
	
	
	public void set(int pos) {
		validate(pos);
		this.bitMap[pos / this.SIZE] |= this.BIT << pos % this.SIZE;
	}
	
	public void reset(int pos) {
		validate(pos);
		this.bitMap[pos / this.SIZE] &= (this.BIT << pos % this.SIZE) ^ this.MASK;
	}
	
	public boolean isSet(int pos) {
		validate(pos);
		return (this.bitMap[pos / this.SIZE] & (this.BIT << pos % this.SIZE)) != this.ZERO;
	}
	
	public byte get(int pos) {
		return isSet(pos) ? this.BIT : this.ZERO;
	}
	
	
	
	
	
	
	

	private String getBinaryString(int index) {
		String binaryString = StringUtil.leftPad(Integer.toBinaryString(this.bitMap[index]),Byte.SIZE,"0");
		return binaryString.substring(binaryString.length() - Byte.SIZE);
	}
	
	public String toBinaryString() {
		StringBuffer sb = new StringBuffer(this.SIZE + this.bitMap.length);

		for (int index = 0; index < bitMap.length; ++index) {
			sb.append(" ").append(getBinaryString(index));
		}
		
		return sb.length() > 0 ? sb.toString().substring(1) : "";
	}
	
	public String toString() {
		StringBuffer sb = new StringBuffer((Byte.SIZE + 1) * this.bitMap.length);

		for (int index = 0; index < bitMap.length; ++index) {
			sb.append(" ").append(String.format("%02x",this.bitMap[index]));
		}

		return sb.length() > 0 ? sb.toString().substring(1) : "";
	}
}
