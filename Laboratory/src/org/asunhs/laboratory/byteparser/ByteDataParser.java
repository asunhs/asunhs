package org.asunhs.laboratory.byteparser;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Arrays;

public abstract class ByteDataParser {
	
	public static class Index {
		private int index;
		
		public Index() {
			this.index = 0;
		}
		
		public Index(int index) {
			this.index = index;
		}

		public int getIndex() {
			return index;
		}
		
		public int forword(int length) {
			return index += length;
		}
	}
	
	protected byte[] subbyte(Index index, int length, byte[] body) {
		int pIndex = index.getIndex();
		int qIndex = index.forword(length);
		
		return Arrays.copyOfRange(body, pIndex, qIndex < body.length ? qIndex : body.length);
	}
	
	public void parse(Index index, byte[] body) {
		// check index validation
		if (index.getIndex() < 0 || index.getIndex() >= body.length) {
			throw new ArrayIndexOutOfBoundsException();
		}
		
		// execute parsing
		read(index, body);
	}
	
	private static final int BUFF_SIZE_FOR_INT    = Integer  .SIZE/Byte.SIZE;
	private static final int BUFF_SIZE_FOR_DOUBLE = Double   .SIZE/Byte.SIZE;
	private static final int BUFF_SIZE_FOR_FLOAT  = Float    .SIZE/Byte.SIZE;
	private static final int BUFF_SIZE_FOR_LONG   = Long     .SIZE/Byte.SIZE;
	private static final int BUFF_SIZE_FOR_SHORT  = Short    .SIZE/Byte.SIZE;
	private static final int BUFF_SIZE_FOR_CHAR   = Character.SIZE/Byte.SIZE;
	
	private static final ByteOrder ORDER = ByteOrder.BIG_ENDIAN;
	
	
	/**
	 *  To Byte
	 */
	
	public static byte[] toByte(int value) {
		 
		ByteBuffer buff = ByteBuffer.allocate(BUFF_SIZE_FOR_INT);
		buff.order(ORDER);
		buff.putInt(value);
 
		return buff.array();
	}
	
	public static byte[] toByte(short value) {
		 
		ByteBuffer buff = ByteBuffer.allocate(BUFF_SIZE_FOR_SHORT);
		buff.order(ORDER);
		buff.putShort(value);
 
		return buff.array();
	}
	
	public static byte[] toByte(long value) {
		 
		ByteBuffer buff = ByteBuffer.allocate(BUFF_SIZE_FOR_LONG);
		buff.order(ORDER);
		buff.putLong(value);
 
		return buff.array();
	}
	
	public static byte[] toByte(float value) {
		 
		ByteBuffer buff = ByteBuffer.allocate(BUFF_SIZE_FOR_FLOAT);
		buff.order(ORDER);
		buff.putFloat(value);
 
		return buff.array();
	}
	
	public static byte[] toByte(double value) {
		 
		ByteBuffer buff = ByteBuffer.allocate(BUFF_SIZE_FOR_DOUBLE);
		buff.order(ORDER);
		buff.putDouble(value);
 
		return buff.array();
	}
	
	public static byte[] toByte(char value) {
		 
		ByteBuffer buff = ByteBuffer.allocate(BUFF_SIZE_FOR_CHAR);
		buff.order(ORDER);
		buff.putChar(value);
 
		return buff.array();
	}
	
	public static byte[] toByte(String value) {
		return value.getBytes();
	}
	
	
	
	/**
	 *  From Byte 
	 */
	
	private static ByteBuffer fromByte(byte[] bytes, int size) {
		ByteBuffer buff = ByteBuffer.allocate(size);
		buff.order(ORDER);
		buff.put(bytes);
		buff.flip();
		
		return buff;
	}
	
	public static int byteToInt(byte[] bytes) {
		return fromByte(bytes, BUFF_SIZE_FOR_INT).getInt();
	}
	
	public static short byteToShort(byte[] bytes) {
		return fromByte(bytes, BUFF_SIZE_FOR_SHORT).getShort();
	}
	
	public static long byteToLong(byte[] bytes) {
		return fromByte(bytes, BUFF_SIZE_FOR_LONG).getLong();
	}
	
	public static float byteToFloat(byte[] bytes) {
		return fromByte(bytes, BUFF_SIZE_FOR_FLOAT).getFloat();
	}
	
	public static double byteToDouble(byte[] bytes) {
		return fromByte(bytes, BUFF_SIZE_FOR_DOUBLE).getDouble();
	}
	
	public static char byteToChar(byte[] bytes) {
		return fromByte(bytes, BUFF_SIZE_FOR_CHAR).getChar();
	}
	
	public static String byteToString(byte[] bytes) {
		return new String(bytes, 0, bytes.length);
	}
	
	
	
	
	/**
	 *  get Value From Body 
	 */

	protected int getInt(Index index, byte[] body) {
		return byteToInt(subbyte(index, BUFF_SIZE_FOR_INT, body));
	}
	
	protected short getShort(Index index, byte[] body) {
		return byteToShort(subbyte(index, BUFF_SIZE_FOR_SHORT, body));
	}
	
	protected long getLong(Index index, byte[] body) {
		return byteToLong(subbyte(index, BUFF_SIZE_FOR_LONG, body));
	}
	
	protected float getFloat(Index index, byte[] body) {
		return byteToFloat(subbyte(index, BUFF_SIZE_FOR_FLOAT, body));
	}
	
	protected double getDouble(Index index, byte[] body) {
		return byteToDouble(subbyte(index, BUFF_SIZE_FOR_DOUBLE, body));
	}
	
	protected char getChar(Index index, byte[] body) {
		return byteToChar(subbyte(index, BUFF_SIZE_FOR_CHAR, body));
	}
	
	protected String getString(Index index, int length, byte[] body) {
		return byteToString(subbyte(index, length, body));
	}
	
	
	
	
	/**
	 * parser's job
	 * 
	 * @param pIndex  pointer
	 * @param body    parsing target
	 */
	protected abstract void read(Index pIndex, byte[] body);
}
