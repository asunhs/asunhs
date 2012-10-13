package org.asunhs.laboratory.bitmap;

import java.util.Arrays;

import freemarker.template.utility.StringUtil;

public class BitMap {
	
	public final byte BIT = 1;
	public final byte ZERO = 0;
	
	private final byte MASK = -1;
	
	/**
	 *  length : number of total bit
	 */
	public final int length;
	
	/**
	 *  size   : length of byte array
	 */
	public final int size;
	
	private byte[] bitMap;
	
	public BitMap(int length) {
		this.length = length;
		this.size = ((this.length - 1) / Byte.SIZE) + 1;
		this.bitMap = new byte[this.size];
		initMap();
	}
	
	public BitMap(byte[] bitMap) {
		this.length = bitMap.length * Byte.SIZE;
		this.size = bitMap.length;
		this.bitMap = Arrays.copyOfRange(bitMap, 0, this.size);
	}
		
	private void initMap() {
		for (int index = this.size; index-- != 0;) {
			this.bitMap[index] = (byte) 0x00;
		}
	}
	
	private void validate(int pos) {
		if (pos < 0 || pos >= this.length) {
			throw new ArrayIndexOutOfBoundsException();
		}
	}
	
	
	
	public void set(int pos) {
		validate(pos);
		this.bitMap[pos / this.length] |= this.BIT << pos % this.length;
	}
	
	public void reset(int pos) {
		validate(pos);
		this.bitMap[pos / this.length] &= (this.BIT << pos % this.length) ^ this.MASK;
	}
	
	public boolean isSet(int pos) {
		validate(pos);
		return (this.bitMap[pos / this.length] & (this.BIT << pos % this.length)) != this.ZERO;
	}
	
	public byte get(int pos) {
		return isSet(pos) ? this.BIT : this.ZERO;
	}
	
	
	
	
	
	
	

	private String getBinaryString(int index) {
		String binaryString = StringUtil.leftPad(Integer.toBinaryString(this.bitMap[index]),Byte.SIZE,"0");
		return binaryString.substring(binaryString.length() - Byte.SIZE);
	}
	
	public String toBinaryString() {
		StringBuffer sb = new StringBuffer(this.length + this.size);

		for (int index = 0; index < this.size; ++index) {
			sb.append(" ").append(getBinaryString(index));
		}
		
		return sb.length() > 0 ? sb.toString().substring(1) : "";
	}
	
	public String toString() {
		StringBuffer sb = new StringBuffer((Byte.SIZE + 1) * this.size);

		for (int index = 0; index < this.size; ++index) {
			sb.append(" ").append(String.format("%02x",this.bitMap[index]));
		}

		return sb.length() > 0 ? sb.toString().substring(1) : "";
	}
}
